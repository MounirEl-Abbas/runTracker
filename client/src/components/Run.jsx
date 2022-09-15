import moment from "moment";
import { FaLocationArrow, FaCalendarAlt } from "react-icons/fa";
import { IoFootstepsSharp } from "react-icons/io5";
import { TbMessage } from "react-icons/tb";
import styled from "styled-components";
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

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }
  }
  .superb {
    background: #fcefc7;
    color: #e9b949;
  }
  .adequate {
    background: #e0e8f9;
    color: #647acb;
  }
  .poor {
    background: #fccece;
    color: #d66a6a;
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
  }
  footer {
    margin-top: 1rem;
  }
  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }
  &:hover .actions {
    visibility: visible;
  }
`;
