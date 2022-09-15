import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_RUN_BEGIN,
  CREATE_RUN_SUCCESS,
  CREATE_RUN_ERROR,
  GET_RUNS_BEGIN,
  GET_RUNS_SUCCESS,
  SET_EDIT_RUN,
  DELETE_RUN_BEGIN,
  EDIT_RUN_BEGIN,
  EDIT_RUN_SUCCESS,
  EDIT_RUN_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
} from "./actions";
import { initialState } from "./appContext";

const reducer = (state, action) => {
  //
  /************ ALERTS *************/
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  /*************************************/

  /************ REGISTER/LOGIN *************/
  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  // LOGOUT
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    };
  }
  /*************************************/

  /************ UPDATING USER INFO *************/
  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated!",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  /*************************************/

  /************ CREATE RUN *************/
  if (action.type === CREATE_RUN_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_RUN_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Run Added Successfully!",
    };
  }
  if (action.type === CREATE_RUN_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  /*************************************/

  /************ GET ALL RUNS *************/
  if (action.type === GET_RUNS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === GET_RUNS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      runs: action.payload.runs,
      totalRuns: action.payload.totalRuns,
      numOfPages: action.payload.numOfPages,
    };
  }
  /*************************************/

  /************ DELETE & EDIT RUN *************/
  if (action.type === DELETE_RUN_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === SET_EDIT_RUN) {
    const run = state.runs.find(run => run._id === action.payload.runId);
    const { _id, runTime, runDistance, stepsTaken, runRating, runNotes } = run;
    return {
      ...state,
      isEditing: true,
      editRunId: _id,
      runTime,
      runDistance,
      stepsTaken,
      runRating,
      runNotes,
    };
  }

  if (action.type === EDIT_RUN_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_RUN_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Run Updated Successfully!",
    };
  }
  if (action.type === EDIT_RUN_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  /*************************************/

  /************ SHOW STATS *************/
  if (action.type === SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyRuns: action.payload.monthlyRuns,
    };
  }

  /*************************************/

  /************ MISC FUNCTIONALITIES *************/

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
      page: 1,
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      runTime: 0,
      runDistance: 0,
      stepsTaken: 0,
      runRating: "adequate",
      runNotes: "",
      isEditing: false,
      editJobId: "",
    };
    return {
      ...state,
      ...initialState,
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filterRunRating: "all",
      filterRunMetric: "latest",
    };
  }
  if (action.type === CHANGE_PAGE) {
    return {
      ...state,
      page: action.payload.page,
    };
  }

  /*************************************/

  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
