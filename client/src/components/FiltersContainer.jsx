import { FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";

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
