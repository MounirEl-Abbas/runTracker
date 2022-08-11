import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Run from "./Run";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/JobsContainer";
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
    const delayForTyping = setTimeout(() => {
      getRuns();
    }, 700);
    return () => clearTimeout(delayForTyping);
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
