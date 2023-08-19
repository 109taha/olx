const mongoose = require("mongoose");

const ADSchema = new mongoose.Schema({
  AD_placment: {
    type: String,
  },
  AD_pic: {
    type: String,
  },
});
const ADD = mongoose.model("ADD", ADSchema);

module.exports = ADD;
