import { useState } from "react";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/ChartsContainer";
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
