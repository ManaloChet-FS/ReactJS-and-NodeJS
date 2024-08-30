const mongoose = require("mongoose");

const gamesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Game name is required."],
      trim: true,
      maxLength: [50, "Game name cannot exceed 50 characters."],
    },
    releaseDate: {
      type: Date,
      required: [true, "Release date is required."],
    },
    genre: {
      type: [String],
      required: [true, "Please specify the game's genre"],
      // Can only include genre's in the list below
      enum: {
        values: [
          "Shooter",
          "Platformer",
          "Racing",
          "RPG",
          "Sport",
          "MMO",
          "Stealth",
          "Adventure",
          "Horror"
        ],
        message: "{VALUE} is not a correct genre.",
      },
    },
    averageScore: {
      type: Number,
      min: [0, "Rating cannot be lower than 0."],
      max: [10, "Rating cannot be more than 10."],
    },
    studio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Studio",
      required: [true, "Game studio is required."],
    },
  },
  { timestamps: true, selectPopulatedPaths: false },
);

module.exports = mongoose.model("Game", gamesSchema);
