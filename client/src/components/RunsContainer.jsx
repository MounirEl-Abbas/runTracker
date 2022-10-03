import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Run from "./Run";
import Loading from "./Loading";
import styled from "styled-components";
import PageBtnContainer from "./PageBtnContainer";

const RunsContainer = () => {
  const {
    getRuns,
    runs,
    isLoading,
    totalRuns,
    filterRunRating,
    filterRunMetric,
    page,
    numOfPages,
  } = useAppContext();

  useEffect(() => {
    getRuns();
    //eslint-disable-next-line
  }, [filterRunRating, filterRunMetric, page]);

  if (isLoading) {
    return <Loading center />;
  }

  if (runs.length === 0) {
    return (
      <Wrapper>
        <h2>No runs found...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalRuns} run{runs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {runs.map(run => (
          <Run key={run._id} {...run} />
        ))}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default RunsContainer;

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;
