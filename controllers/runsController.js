import Run from "../models/Run.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";

const createRun = async (req, res) => {
  const { runTime, runDistance } = req.body;
  if (!runTime || !runDistance)
    throw new BadRequestError("Please provide all values!");

  req.body.createdBy = req.user.userId;

  const run = await Run.create(req.body);

  res.status(StatusCodes.CREATED).json({ run });
};

const getAllRuns = async (req, res) => {
  const { filterRunMetric, filterRunRating } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (filterRunRating !== "all") {
    queryObject.runRating = filterRunRating;
  }

  let result = Run.find(queryObject);

  //Sort by createdAt
  if (filterRunMetric === "latest") {
    result = result.sort("-createdAt");
  }
  if (filterRunMetric === "oldest") {
    result = result.sort("createdAt");
  }
  //Sort by run metric
  if (filterRunMetric === "longest duration") {
    result = result.sort("-runTime");
  }
  if (filterRunMetric === "shortest duration") {
    result = result.sort("runTime");
  }
  //Sort by runDistance
  if (filterRunMetric === "furthest distance") {
    result = result.sort("-runDistance");
  }
  if (filterRunMetric === "shortest distance") {
    result = result.sort("runDistance");
  }

  const runs = await result;

  res
    .status(StatusCodes.OK)
    .json({ totalRuns: runs.length, numOfPages: 1, runs });
};

const updateRun = async (req, res) => {
  const { id: runId } = req.params;
  const { runTime, runDistance, stepsTaken } = req.body;

  if (!runTime || !runDistance || !stepsTaken)
    throw new BadRequestError("Please provide all values!");

  const run = await Run.findOne({ _id: runId });
  if (!run) throw new NotFoundError(`No run with id: ${runId}`);

  checkPermissions(req.user, run.createdBy);

  const updatedRun = await Run.findOneAndUpdate({ _id: runId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedRun });
};

const deleteRun = async (req, res) => {
  const { id: runId } = req.params;
  const run = await Run.findOne({ _id: runId });
  if (!run) throw new NotFoundError(`No run with id: ${runId}`);
  checkPermissions(req.user, run.createdBy);

  await run.remove();

  res.status(StatusCodes.OK).json();
};

const showStats = async (req, res) => {
  const stats = {};

  const runs = await Run.find({ createdBy: req.user.userId });

  stats.totalRuns = runs.length;

  stats.totalDistanceRan = runs.reduce(function (acc, obj) {
    return acc + obj.runDistance;
  }, 0);

  //Get sum of all runPace, and divide by #ofRuns for runPace average
  let sumOfRunPace = runs.reduce(function (acc, obj) {
    return acc + obj.runPace;
  }, 0);

  //Get sum of all runSpeed, and divide by #ofRuns for runSpeed average
  let sumOfRunSpeed = runs.reduce(function (acc, obj) {
    return acc + obj.runSpeed;
  }, 0);

  stats.averageRunPace = Number(
    parseFloat(sumOfRunPace / runs.length).toFixed(2)
  );

  stats.averageRunSpeed = Number(
    parseFloat(sumOfRunSpeed / runs.length).toFixed(2)
  );

  stats.totalDistanceRan = parseFloat(stats.totalDistanceRan.toFixed(2));

  stats.averageDistancePerRun =
    parseFloat(stats.totalDistanceRan / runs.length).toFixed(2) || 0;

  let monthlyRuns = await Run.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 12 },
  ]);

  // prettify the result, to front-ends needs
  monthlyRuns = monthlyRuns
    .map(item => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ stats, monthlyRuns });
};

export { createRun, getAllRuns, deleteRun, updateRun, showStats };
