import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Run from "./Run";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/JobsContainer";

const RunsContainer = () => {
  const { getRuns, runs, isLoading, page, totalRuns } = useAppContext();

  useEffect(() => {
    getRuns();
  }, []);

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
      {/* Pagination buttons go here ... */}
    </Wrapper>
  );
};
export default RunsContainer;
