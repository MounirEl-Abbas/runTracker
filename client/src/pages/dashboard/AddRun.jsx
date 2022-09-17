import styled from "styled-components";
import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";

const AddRun = () => {
  const {
    isLoading,
    handleChange,
    runTime,
    runDistance,
    stepsTaken,

    runRating,
    runRatingOptions,
    clearValues,
    displayAlert,
    createRun,
    showAlert,
    isEditing,
    editRun,
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
    if (isEditing) {
      editRun();
      return;
    }

    createRun();
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Edit Run" : "Add Run"}</h3>
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

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;
