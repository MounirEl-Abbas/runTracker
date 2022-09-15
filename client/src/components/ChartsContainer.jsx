import { useState } from "react";
import { useAppContext } from "../context/appContext";
import styled from "styled-components";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyRuns: data } = useAppContext();
  return (
    <Wrapper>
      <h4>Runs Per Month</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "View Area Chart" : "View Bar Chart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};
export default ChartsContainer;

const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;
  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }
`;
