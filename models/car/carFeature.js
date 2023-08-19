const mongoose = require("mongoose");

const CarFeatureSchema = new mongoose.Schema({
  features: {
    type: String,
    require: true,
    enum: [
      "ABS",
      "Air Bags",
      "Air Conditioning",
      "Alloy Rims",
      "AM/FM Radio",
      "CD Player",
      "Cassette Player",
      "Cool Box",
      "Cruise Control",
      "Climate Control",
      "DVD Player",
      "Front Speakers",
      "Front Camera",
      "Heated Seats",
      "Immobilizer Key",
      "Keyless Entry",
      "Navigation System",
      "Power Locks",
      "Power Mirrors",
      "Power Steering",
      "Power Windows",
      "Rear Seat Entertainment",
      "Rear AC Vents",
      "Rear speakers",
      "Rear Camera",
      "Sun Roof",
      "Steering Switches",
      "USB and Auxillary Cable",
    ],
  },
});

const CarFeature = new mongoose.model("CarFeature", CarFeatureSchema);

module.exports = CarFeature;
