import Wrapper from "../assets/wrappers/StatItem";
const StatItem = ({ count, title, title1, title2, icon, color, bcg }) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <div className="count">{count}</div>
        <div className="icon">{icon}</div>
      </header>
      <h5 className="title">{title}</h5>
      {title1 && <h5 className="title">{title1}</h5>}
      {title2 && <h5 className="title">{title2}</h5>}
    </Wrapper>
  );
};
export default StatItem;
