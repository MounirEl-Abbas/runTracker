import { FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import styled from "styled-components";

const FiltersContainer = () => {
  const {
    isLoading,
    filterRunRating,
    runRatingOptions,
    filterRunMetric,
    filterRunOptions,
    handleChange,
    clearFilters,
  } = useAppContext();

  const handleFilters = e => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    clearFilters();
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>Filters</h4>
        <div className="form-center">
          {/* Filter by Run Rating */}
          <FormRowSelect
            labelText="Run Rating"
            name="filterRunRating"
            value={filterRunRating}
            handleChange={handleFilters}
            list={["all", ...runRatingOptions]}
          />
          {/* Sort by Run property */}
          <FormRowSelect
            labelText="Run Metric"
            name="filterRunMetric"
            value={filterRunMetric}
            handleChange={handleFilters}
            list={filterRunOptions}
          />

          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}>
            Clear Filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default FiltersContainer;

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`;
