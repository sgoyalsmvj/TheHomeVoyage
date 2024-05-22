const PlaceModel = require("../models/Place");

const getAllPlaces = async (req, res) => {
  try {
    const places = await PlaceModel.find();
    res.status(200).json({ places });
  } catch (error) {
    console.error("Error fetching places:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPlace = async (req, res) => {
  const { id } = req.params;
  try {
    const place = await PlaceModel.findById(id);
    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }
    res.status(200).json({ place });
  } catch (error) {
    console.error(`Error fetching place with id ${id}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addPlace = async (req, res) => {
  // console.log(req.userData);
  const { id } = req.userData;
  const {
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  try {
    const newPlace = new PlaceModel({
      owner: id,
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    await newPlace.save();
    res.status(201).json(newPlace);
  } catch (error) {
    console.error("Error creating place:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const editPlace = async (req, res) => {
  console.log(req.params, req.body);
  const { id } = req.params;
  const {
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  try {
    const place = await PlaceModel.findById(id);

    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }

    // Check if the user is the owner of the place
    if (req.userData.id !== place.owner.toString()) {
      return res.status(403).json({ error: "Forbidden" });
    }

    place.set({
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });

    const updatedPlace = await place.save();
    res.json(updatedPlace);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deletePlace = async (req, res) => {
  const { id } = req.params;

  try {
    const place = await PlaceModel.findById(id);
    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }

    // Check if the user is the owner of the place
    if (req.userData.id !== place.owner.toString()) {
      return res
        .status(403)
        .json({ error: "Forbidden: You are not the owner of this place" });
    }

    await place.deleteOne();
    res.status(204).json({ message: "Place deleted" });
  } catch (error) {
    console.error(`Error deleting place with id ${id}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const userPlaces = async (req, res) => {
  const { id } = req.userData;

  try {
    const places = await PlaceModel.find({ owner: id });
    res.status(200).json({ places });
  } catch (error) {
    console.error("Error fetching user places:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllPlaces, getPlace, addPlace, editPlace, deletePlace,userPlaces };
