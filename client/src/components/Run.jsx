import moment from "moment";
import styled from "styled-components";

import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";
//components
import RunInfo from "./RunInfo";
//icons
import { FaCalendarAlt } from "react-icons/fa";
import { IoFootstepsSharp } from "react-icons/io5";
import { GiPathDistance } from "react-icons/gi";
import { BiTimeFive } from "react-icons/bi";
const Run = ({
  runTime,
  runDistance,
  runPace,
  runSpeed,
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
          <GiPathDistance />
          <p>{runDistance} km</p>
        </div>
        <div className="info">
          <p>Pace: {runPace} min/km</p>
          <p>Speed: {runSpeed} km/min</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <RunInfo icon={<BiTimeFive />} text={`${runTime} minutes`} />

          <RunInfo icon={<FaCalendarAlt />} text={date} />
          <RunInfo icon={<IoFootstepsSharp />} text={stepsTaken} />
          <div className={`status ${runRating}`}>{runRating}</div>
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
  background: var(--grey-dark);
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
  }
  .main-icon {
    width: 70px;
    height: 70px;
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.2rem;
    font-weight: 600;
    text-transform: capitalize;
    margin-right: 2rem;
    svg {
      font-size: 4.5rem;
      position: absolute;
      color: var(--primary-700);
    }
    p {
      width: 80px;
      transform: rotateZ(-45deg);
      letter-spacing: var(--letterSpacing);
      text-align: center;
    }
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-600);
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
    align-self: center;
    margin-top: 2px;
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
