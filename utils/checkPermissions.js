import { UnauthenticatedError } from "../errors/index.js";

const checkPermissions = (reqUser, resourceCreatedBy) => {
  if (reqUser.userId === resourceCreatedBy.toString()) return;

  throw new UnauthenticatedError("Not authorized to access this route");
};

export default checkPermissions;
