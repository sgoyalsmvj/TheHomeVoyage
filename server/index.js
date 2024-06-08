const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const connect = require("./db/config");
const passport = require("passport");
const session = require("express-session");
const app = express();

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

app.use(
  session({
    secret: "somethingsecretgoeshere",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

connect();


app.get("/test", (req, res) => {
  res.json("test ok");
});

app.use("/", require("./routes/auth.routes.js"));
app.use("/", require("./routes/place.routes.js"));
app.use("/", require("./routes/upload.routes.js"));
app.use("/", require("./routes/booking.routes.js"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Deployed on port: ${PORT}`);
});
