const mongoose = require("mongoose");

const studiosSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Studio name is required."],
      maxLength: [50, "Studio name cannot exceed more than 50 characters."],
    },
    yearEstablished: {
      type: Number,
      required: [true, "Year established is required."],
      // Gets the current year and sets it as the max
      max: [new Date().getFullYear(), "Year cannot be in the future."],
      // Checks for a 4 digit number
      match: [/^\d{4}$/, "Enter a valid year."],
    },
    country: {
      type: String,
      maxLength: [50, "Country cannot exceed more than 50 characters."],
    },
    status: {
      type: String,
      required: [true, "Studio status is required."],
      // Must be 1 of 3 statuses
      enum: {
        values: ["Active", "Closed", "Merged"],
        message: '{VALUE} is not a valid status.'
      },
    },
    games: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
      },
    ],
  },
  { timestamps: true, selectPopulatedPaths: false }
);

module.exports = mongoose.model("Studio", studiosSchema);
