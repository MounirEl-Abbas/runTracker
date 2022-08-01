const createRun = async (req, res) => {
  res.send("create Run");
};
const getAllRuns = async (req, res) => {
  res.send("getAll Run");
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
