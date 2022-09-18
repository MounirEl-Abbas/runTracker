import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useAppContext();
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });
  console.log(pages);

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = numOfPages;
    }
    changePage(newPage);
  };
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < numOfPages) {
      newPage = 1;
    }
    changePage(newPage);
  };

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map(pageNumber => (
          <button
            className={pageNumber === page ? "pageBtn active" : "pageBtn"}
            type="button"
            key={pageNumber}
            onClick={() => changePage(pageNumber)}>
            {pageNumber}
          </button>
        ))}
      </div>
      <button className="next-btn" onClick={nextPage}>
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;

const Wrapper = styled.section`
  height: 6rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-wrap: wrap;
  gap: 1rem;
  .btn-container {
    background: var(--primary-100);
    border-radius: var(--borderRadius);
  }
  .pageBtn {
    background: transparent;
    border-color: transparent;
    width: 50px;
    height: 40px;
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--primary-500);
    transition: var(--transition);
    border-radius: var(--borderRadius);
    cursor: pointer;
  }
  .active {
    background: var(--primary-500);
    color: var(--grey-dark);
  }
  .prev-btn,
  .next-btn {
    width: 100px;
    height: 40px;
    background: var(--grey-dark);
    border-color: transparent;
    border-radius: var(--borderRadius);
    color: var(--primary-500);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
  }
  .prev-btn:hover,
  .next-btn:hover {
    background: var(--primary-500);
    color: var(--grey-dark);
  }
`;
