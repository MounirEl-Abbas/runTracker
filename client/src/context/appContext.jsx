import React, { useReducer, useContext } from "react";
import axios from "axios";
import reducer from "./reducer";
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
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  showSidebar: false,
  runTime: 0,
  runDistance: 0,
  stepsTaken: 0,
  runNotes: "",
  runRating: "adequate",
  runRatingOptions: ["superb", "adequate", "poor"],
  isEditing: false,
  editRunId: "",
  runs: [],
  totalRuns: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  /********** AXIOS Interceptors (middleware) ***********/
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  //request interceptor
  authFetch.interceptors.request.use(
    config => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  //response interceptor
  authFetch.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
      }

      return Promise.reject(error);
    }
  );
  /********************************************/

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const response = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, token } = response.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const updateUser = async currentUser => {
    dispatch({ type: UPDATE_USER_BEGIN });

    try {
      const { data } = await authFetch.patch("auth/updateUser", currentUser);
      const { user, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token },
      });
      //update local storage values
      addUserToLocalStorage({ user, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createRun = async () => {
    dispatch({ type: CREATE_RUN_BEGIN });

    try {
      const { runTime, runDistance, stepsTaken, runRating, runNotes } = state;

      await authFetch.post("/runs", {
        runTime,
        runDistance,
        stepsTaken,
        runRating,
        runNotes,
      });
      dispatch({ type: CREATE_RUN_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_RUN_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getRuns = async () => {
    dispatch({ type: GET_RUNS_BEGIN });

    try {
      const { data } = await authFetch.get("/runs");
      const { runs, totalRuns, numOfPages } = data;
      dispatch({
        type: GET_RUNS_SUCCESS,
        payload: {
          runs,
          totalRuns,
          numOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
      // logoutUser()
    }
    clearAlert();
  };

  const setEditRun = runId => {
    dispatch({ type: SET_EDIT_RUN, payload: { runId } });
  };

  const editRun = async () => {
    dispatch({ type: EDIT_RUN_BEGIN });

    try {
      const { runTime, runDistance, stepsTaken, runRating, runNotes } = state;
      await authFetch.patch(`/runs/${state.editRunId}`, {
        runTime,
        runDistance,
        stepsTaken,
        runRating,
        runNotes,
      });
      dispatch({ type: EDIT_RUN_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_RUN_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteRun = async runId => {
    dispatch({ type: DELETE_RUN_BEGIN });
    try {
      await authFetch.delete(`/runs/${runId}`);
      getRuns();
    } catch (error) {
      console.log(error.response);
      // logoutUser();
    }
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch.get("/runs/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.stats,
        },
      });
    } catch (error) {
      console.log(error);
      // logoutUser()
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        logoutUser,
        toggleSidebar,
        updateUser,
        handleChange,
        clearValues,
        createRun,
        getRuns,
        setEditRun,
        editRun,
        deleteRun,
        showStats,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
