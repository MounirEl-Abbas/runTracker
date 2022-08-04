import Run from "../models/Run.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const createRun = async (req, res) => {
  const { runTime, runDistance } = req.body;
  if (!runTime || !runDistance)
    throw new BadRequestError("Please provide all values!");

  req.body.createdBy = req.user.userId;

  const run = await Run.create(req.body);

  res.status(StatusCodes.CREATED).json({ run });
};
const getAllRuns = async (req, res) => {
  const runs = await Run.find({ createdBy: req.user.userId });
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
  res.send("show stats Run");
};

export { createRun, getAllRuns, deleteRun, updateRun, showStats };
