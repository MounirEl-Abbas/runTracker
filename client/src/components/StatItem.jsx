import styled from "styled-components";
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

const Wrapper = styled.article`
  padding: 2rem;
  background: var(--grey-dark);
  border-radius: var(--borderRadius);
  border-bottom: 5px solid ${props => props.color};
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .count {
    display: block;
    font-weight: 700;
    font-size: 40px;
    color: ${props => props.color};
  }
  .title {
    margin: 0;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: left;
    margin-top: 0.5rem;
  }
  .icon {
    width: 70px;
    height: 60px;
    background: ${props => props.bcg};
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 2rem;
      color: ${props => props.color};
    }
  }
`;
