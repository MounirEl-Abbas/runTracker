import Wrapper from "../assets/wrappers/StatsContainer";
import { useAppContext } from "../context/appContext";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import StatItem from "./StatItem";
const StatsContainer = () => {
  const { stats } = useAppContext();
  const defaultStats = [
    {
      title: "Total Runs Logged",
      count: stats.totalRuns || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "Total Distance Ran",
      count: (stats.totalDistanceRan || 0) + " Km",
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "Distance per Run: " + stats.averageDistancePerRun + " km",
      title1: "Run Pace: " + stats.averageRunPace + " min/km",
      title2: "Run Speed: " + stats.averageRunSpeed + " km/min",
      count: "Averages",
      icon: <FaBug />,
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