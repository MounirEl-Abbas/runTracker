const router = express.Router();
import express from "express";
import {
  createRun,
  getAllRuns,
  deleteRun,
  updateRun,
  showStats,
} from "../controllers/runsController.js";

/********* User is authenticated prior to every route. 'middleware/auth' *********/
router.route("/").post(createRun).get(getAllRuns);
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteRun).patch(updateRun);

export default router;
