import Run from "../models/Run.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

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
  res.send("update Run");
};
const deleteRun = async (req, res) => {
  res.send("delete Run");
};
const showStats = async (req, res) => {
  res.send("show stats Run");
};

export { createRun, getAllRuns, deleteRun, updateRun, showStats };
