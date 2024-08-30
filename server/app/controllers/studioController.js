const Studios = require("../models/Studios");
const Messages = require("../messages/messages");

exports.getAllStudios = async (req, res) => {
  try {
    let query = Studios.find().populate('games', 'name');
  
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

    const studios = await query;
    
    res.status(200).json({
      data: studios,
      success: true,
      message: Messages.dataRetrieved,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: Messages.serverError,
      error,
    });
  }
};

exports.getStudioById = async (req, res) => {
  let studio;
  try {
    const { id } = req.params;
    studio = await Studios.findById(id)
      .select(
        "_id name yearEstablished country status games createdAt updatedAt"
      )
      .populate("games", "_id name");
    res.status(200).json({
      data: studio,
      success: true,
      message: Messages.dataRetrieved,
    });
  } catch (error) {
    if (studio === undefined || studio === null) {
      res.status(404).json({
        success: false,
        message: Messages.studioNotFound,
      });
    } else {
      res.status(500).json({
        success: false,
        message: Messages.serverError,
        error,
      });
    }
  }
};

exports.createStudio = async (req, res) => {
  try {
    const { studio } = req.body;
    const newStudio = await Studios.create(studio);
    res.status(201).json({
      data: newStudio,
      success: true,
      message: Messages.studioCreated,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errorString = '';
      // Converts the errors object into an array
      const errArray = Object.values(error.errors);

      // Adds the error message on each error onto the errorString
      errArray.forEach(err => {
        errorString += err.message + ' ';
      })

      res.status(422).json({
        success: false,
        message: errorString.trimEnd(),
      });
    } else {
      res.status(500).json({
        success: false,
        message: Messages.serverError,
        error,
      });
    }
  }
};

exports.updateStudio = async (req, res) => {
  let studio;
  try {
    const { id } = req.params;
    studio = await Studios.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      data: studio,
      success: true,
      message: Messages.studioUpdated,
    });
  } catch (error) {
    if (studio === undefined || studio === null) {
      res.status(404).json({
        success: false,
        message: Messages.studioNotFound,
      });
    } else {
      res.status(500).json({
        success: false,
        message: Messages.serverError,
        error,
      });
    }
  }
};

exports.deleteStudio = async (req, res) => {
  let studio;
  try {
    const { id } = req.params;
    studio = await Studios.findByIdAndDelete(id);
    studios = await Studios.find();
    res.status(200).json({
      data: studios,
      success: true,
      message: Messages.studioDeleted,
    });
  } catch {
    if (studio === undefined || studio === null) {
      res.status(404).json({
        success: false,
        message: Messages.studioNotFound,
      });
    } else {
      res.status(500).json({
        success: false,
        message: Messages.serverError,
        error,
      });
    }
  }
};
