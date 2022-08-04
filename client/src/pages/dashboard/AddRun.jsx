import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";

const AddRun = () => {
  const {
    isLoading,
    handleChange,
    runTime,
    runDistance,
    stepsTaken,
    runNotes,
    runRating,
    runRatingOptions,
    clearValues,
    displayAlert,
    createRun,
    showAlert,
  } = useAppContext();

  const handleRunInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!runTime || !runDistance || !stepsTaken) {
      displayAlert();
      return;
    }
    createRun();
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>Add Run</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* Run Time */}
          <FormRow
            type="number"
            name="runTime"
            value={runTime}
            handleChange={handleRunInput}
            labelText="Run Time"
            step="5"
          />
          {/* Run Distance */}
          <FormRow
            type="number"
            name="runDistance"
            value={runDistance}
            handleChange={handleRunInput}
            labelText="Run Distance"
          />
          {/* steps taken */}
          <FormRow
            type="number"
            name="stepsTaken"
            value={stepsTaken}
            handleChange={handleRunInput}
            labelText="Steps Taken"
          />
          {/* run rating */}
          <FormRowSelect
            name="runRating"
            value={runRating}
            list={runRatingOptions}
            handleChange={handleRunInput}
            labelText="Overall Run"
          />
          {/* run Notes */}
          <div className="form-row">
            <label htmlFor="runNotes" className="form-label">
              Notes
            </label>
            <textarea
              name="runNotes"
              value={runNotes}
              className="form-input"
              maxLength="1000"
              onChange={handleRunInput}
              placeholder="1000 Characters Remaining"></textarea>
          </div>
          {/* btn container */}
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}>
              submit
            </button>
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => clearValues()}>
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddRun;
