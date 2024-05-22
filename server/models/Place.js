const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    address: { type: String, required: true, trim: true },
    photos: {
      type: [String],
      validate: [arrayLimit, "{PATH} exceeds the limit of 10"],
    },
    description: { type: String, trim: true },
    perks: { type: [String], default: [] },
    extraInfo: { type: String, trim: true },
    checkIn: { type: Number, min: 0, max: 23, required: true },
    checkOut: { type: Number, min: 0, max: 23, required: true },
    maxGuests: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

// Custom validator function to limit the number of photos
function arrayLimit(val) {
  return val.length <= 10;
}

// Instance method to format the price (e.g., as currency)
placeSchema.methods.formatPrice = function () {
  return `$${this.price.toFixed(2)}`;
};

// Virtual property to get the full address (if needed)
placeSchema.virtual("fullAddress").get(function () {
  return `${this.address}, ${this.city}, ${this.state}, ${this.zipCode}`;
});

const PlaceModel = mongoose.model("Place", placeSchema);

module.exports = PlaceModel;
