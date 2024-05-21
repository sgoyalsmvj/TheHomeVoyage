const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./models/User");
const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const PlaceModel = require("./models/Place");
const BookingModel = require("./models/Booking");
const connect = require("./db/config");
const passport = require("passport");
const cookieSession = require("cookie-session");
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET || "yourSecretKey";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
// Configure cookie session
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

connect();

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  if (err.name === "ValidationError") {
    return res
      .status(422)
      .json({ error: "Validation failed", details: err.errors });
  }

  res.status(500).json({ error: "Internal Server Error" });
});

// Authentication Middleware
const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  jwt.verify(token, jwtSecret, (err, userData) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
    req.userData = userData;
    next();
  });
};

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.use("/", require("./routes/auth.routes.js"));

// app.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const user = await UserModel.create({
//       name,
//       email,
//       password: bcrypt.hashSync(password, bcryptSalt),
//     });
//     res.json(user);
//   } catch (error) {
//     res.status(422).json(error);
//   }
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await UserModel.findOne({ email });

//   if (!user || !bcrypt.compareSync(password, user.password)) {
//     return res.status(401).json({ error: 'Invalid credentials' });
//   }

//   jwt.sign(
//     { email: user.email, id: user._id },
//     jwtSecret,
//     {},
//     (err, token) => {
//       if (err) throw err;
//       res.cookie("token", token, { secure: true, sameSite: "none" }).json(user);
//     }
//   );
// });

app.get("/profile", authenticateUser, (req, res) => {
  const { id } = req.userData;
  UserModel.findById(id)
    .then((user) =>
      res.json({ name: user.name, email: user.email, id: user._id })
    )
    .catch((err) => res.status(500).json({ error: "Internal Server Error" }));
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";

  try {
    await imageDownloader.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });
    console.log(__dirname + "/uploads/" + newName);
    res.json(newName);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const photosMiddleware = multer({ dest: "uploads/" });

app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];

    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    console.log(newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }

  res.json(uploadedFiles);
});

app.post("/places", authenticateUser, async (req, res) => {
  const { id } = req.userData;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  try {
    const placeData = await PlaceModel.create({
      owner: id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/user-places", authenticateUser, (req, res) => {
  const { id } = req.userData;

  PlaceModel.find({ owner: id })
    .then((places) => res.json(places))
    .catch((err) => res.status(500).json({ error: "Internal Server Error" }));
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const place = await PlaceModel.findById(id);
    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }
    res.json(place);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/user-places", authenticateUser, async (req, res) => {
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  try {
    const placeDoc = await PlaceModel.findById(id);

    if (!placeDoc || req.userData.id !== placeDoc.owner.toString()) {
      return res.status(403).json({ error: "Forbidden" });
    }

    placeDoc.set({
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });

    await placeDoc.save();
    res.json("ok");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/places", async (req, res) => {
  try {
    const places = await PlaceModel.find();
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/bookings", authenticateUser, async (req, res) => {
  const { id } = req.userData;
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;

  try {
    const booking = await BookingModel.create({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
      user: id,
    });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/bookings", authenticateUser, async (req, res) => {
  const { id } = req.userData;

  try {
    const bookings = await BookingModel.find({ user: id }).populate("place");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Deployed on port: ${PORT}`);
});
