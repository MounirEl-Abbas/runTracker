import mongoose from "mongoose";

const RunSchema = new mongoose.Schema(
  {
    runTime: {
      type: Number,
      required: [true, "Please enter length of run in minutes."],
      min: 0,
    },
    runDistance: {
      type: Number,
      required: [true, "Please enter distance ran"],
    },
    // runTime / runDistance = runPace
    runPace: {
      type: Number,
    },
    // runDistance / runTime = runSpeed
    runSpeed: {
      type: Number,
    },
    stepsTaken: {
      type: Number,
      default: 0,
      min: 0,
    },
    runRating: {
      type: String,
      enum: ["superb", "adequate", "poor"],
      default: "adequate",
    },
    runNotes: {
      type: String,
      maxLength: 1000,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user."],
    },
  },
  { timestamps: true }
);

RunSchema.pre("save", async function () {
  //Calculate runPace and runSpeed, and take care of trailing 0s (e.g. 12.00 = 12)
  this.runPace = parseFloat((this.runTime / this.runDistance).toFixed(2));

  this.runSpeed = parseFloat((this.runDistance / this.runTime).toFixed(2));
});

export default mongoose.model("Run", RunSchema);
