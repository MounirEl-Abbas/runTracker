import moment from "moment";
import { FaLocationArrow, FaCalendarAlt } from "react-icons/fa";
import { IoFootstepsSharp } from "react-icons/io5";
import { TbMessage } from "react-icons/tb";
import Wrapper from "../assets/wrappers/Job";
import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";
import RunInfo from "./RunInfo";

const Run = ({
  runTime,
  runDistance,
  runPace,
  runSpeed,
  runNotes,
  runRating,
  stepsTaken,
  createdAt,
  _id,
}) => {
  const { setEditRun, deleteRun } = useAppContext();
  let date = moment(createdAt).format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">
          <FaLocationArrow />
          {runDistance} km
        </div>
        <div className="info">
          <h5>
            Run Duration - {runTime} minute{runTime > 1 && "s"}
          </h5>
          <p>Pace: {runPace} min/km</p>
          <p>Speed: {runSpeed} km/min</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <RunInfo icon={<FaCalendarAlt />} text={date} />
          <div className={`status ${runRating}`}>{runRating}</div>
          <RunInfo icon={<IoFootstepsSharp />} text={stepsTaken} />
          {runNotes && (
            <span className="icon">
              <TbMessage />
            </span>
          )}
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-run"
              className="btn edit-btn"
              onClick={() => setEditRun(_id)}>
              edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteRun(_id)}>
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Run;
