import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import { MdQueryStats } from "react-icons/md";
import { GiJourney, GiNotebook } from "react-icons/gi";
import StatItem from "./StatItem";

const StatsContainer = () => {
  const { stats } = useAppContext();
  const defaultStats = [
    {
      title: "Total Runs Logged",
      count: stats.totalRuns || 0,
      icon: <GiNotebook />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "Total Distance Ran (km)",
      count: stats.totalDistanceRan || 0,
      icon: <GiJourney />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "Distance per Run: " + stats.averageDistancePerRun + " km",
      title1: "Run Pace: " + stats.averageRunPace + " min/km",
      title2: "Run Speed: " + stats.averageRunSpeed + " km/min",
      count: "Averages",
      icon: <MdQueryStats />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((stat, index) => {
        return <StatItem key={index} {...stat} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
  }
`;
