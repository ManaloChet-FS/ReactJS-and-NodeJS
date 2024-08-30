const Games = require("../models/Games");
const Studios = require("../models/Studios");
const Messages = require("../messages/messages");

exports.getAllGames = async (req, res) => {
  try {
    let query = Games.find().populate('studio', 'name');
  
    const queryString = JSON.stringify(req.query);
    // Finds matches that match the regex
    let equalities = queryString.match(
      // Pattern that matches "propertyName":"words/number". Ignores page, limit, sort, lt, lte, gt, gte.
      /"\b(?!page\b|limit\b|lte\b|lt\b|gt\b|gte\b|sort\b|select\b)\w+":"\w+(?:\s\w+)*"/g
    );

    if (equalities) {
      equalities = equalities.join(",");
      equalities = JSON.parse(`{${equalities}}`);
      query.find(equalities);
    }

    const comparisons = queryString.match(
      // Pattern that matches "propertyName":{"lt":"5"} where "lt":"5" can be repeatable.
      /"\w+":\{(?:"(lt|lte|gt|gte)":"\d+",?)+\}/g
    );

    if (comparisons) {
      let comparisonQueries = [];
      // Loops through comparisonsQueries in case there are multiple different property comparisons
      comparisons.forEach((compare) => {
        compare = compare.replace(
          // Looks for gt, gte, lt, or lte and puts a $ sign at the start
          /\b(gt|gte|lt|lte)\b/g,
          (match) => `$${match}`
        );
        comparisonQueries.push(compare);
      });

      comparisonQueries = comparisonQueries.join(",");
      comparisonQueries = JSON.parse(`{${comparisonQueries}}`);
      console.log(comparisonQueries);

      query.find(comparisonQueries);
    }

    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query.select(fields);
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query.sort(sortBy);
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;

    query.skip(skip).limit(limit);

    const games = await query;

    res.status(200).json({
      data: games,
      success: true,
      message: Messages.dataRetrieved,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: Messages.serverError,
    });
  }
};

exports.getGameById = async (req, res) => {
  let game;
  try {
    const { id } = req.params;
    game = await Games.findById(id)
      .select(
        "_id name releaseDate genre averageScore studio createdAt updatedAt"
      )
      .populate("studio", "_id name");
    res.status(200).json({
      data: game,
      success: true,
      message: Messages.dataRetrieved,
    });
  } catch (error) {
    if (game === undefined || game === null) {
      res.status(404).json({
        success: false,
        message: Messages.gameNotFound,
      });
    } else {
      res.status(500).json({
        success: false,
        message: Messages.serverError,
      });
    }
  }
};

exports.createGame = async (req, res) => {
  try {
    const { game } = req.body;
    const newGame = await Games.create(game);
    // Get current list of games by studio
    const { games } = await Studios.findById(newGame.studio);
    // Finds the studio by ID and updates its game list with new game ID
    await Studios.findByIdAndUpdate(newGame.studio, {
      games: [...games, newGame._id],
    });
    res.status(201).json({
      data: newGame,
      success: true,
      message: Messages.gameCreated,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errorString = "";
      // Converts the errors object into an array
      const errArray = Object.values(error.errors);

      // Adds the error message on each error onto the errorString
      errArray.forEach((err) => {
        errorString += err.message + " ";
      });

      res.status(422).json({
        success: false,
        message: errorString.trimEnd(),
      });
    } else {
      res.status(500).json({
        success: false,
        message: Messages.serverError,
        error
      });
    }
  }
};

exports.updateGame = async (req, res) => {
  let game;
  try {
    const { id } = req.params;
    game = await Games.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      data: game,
      success: true,
      message: Messages.gameUpdated,
    });
  } catch (error) {
    if (game === undefined || game === null) {
      res.status(404).json({
        success: false,
        message: Messages.gameNotFound,
      });
    } else {
      res.status(500).json({
        success: false,
        message: Messages.serverError,
      });
    }
  }
};

exports.deleteGame = async (req, res) => {
  let game;
  try {
    const { id } = req.params;
    // Grabs studioId, the studios game list, and the game id as an object
    const { studio: studioId } = await Games.findById(id);
    const { games: studioGames } = await Studios.findById(studioId);
    const { _id: gameId } = await Games.findById(id);

    // Creates a new studio game list utilizing filter. The id objects have to be converted to strings to actually compare their values.
    const newStudioGames = studioGames.filter(
      (studioGame) => studioGame.toString() !== gameId.toString()
    );

    // Updates the studio's game list
    await Studios.findByIdAndUpdate(studioId, { games: newStudioGames });

    // Deletes the game
    game = await Games.findByIdAndDelete(id);

    games = await Games.find();

    res.status(200).json({
      data: games,
      success: true,
      message: Messages.gameDeleted,
    });
  } catch (error) {
    console.log(error);
    if (game === undefined || game === null) {
      res.status(404).json({
        success: false,
        message: Messages.gameNotFound,
      });
    } else {
      res.status(500).json({
        success: false,
        message: Messages.serverError,
      });
    }
  }
};
