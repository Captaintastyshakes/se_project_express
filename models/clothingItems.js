const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    required: true,
    enum: ["warm", "hot", "cold"],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: "You must enter a valid URL.",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author",
    required: true,
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    //required: true,//maybe toy with making this optional?
    required: false,
  },
  createdAt: {
    type: Date,
    value: Date.now(),
  },
});

module.exports = mongoose.model("clothingItem", clothingItemSchema);
