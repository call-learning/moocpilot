import {
  GET_COURSEGRADES,
  STARTED_FETCHING_COURSEGRADES,
  FINISHED_FETCHING_COURSEGRADES,
} from '../constants/actionTypes/coursegrades';

const coursegrades = (state = {
  coursegrades: null,
  startedFetching: false,
  finishedFetching: false,
}, action) => {
  switch (action.type) {
    case GET_COURSEGRADES:
      return {
        ...state,
        coursegrades: action.coursegrades,
      };
    case STARTED_FETCHING_COURSEGRADES:
      return {
        ...state,
        startedFetching: true,
        finishedFetching: false,
      };
    case FINISHED_FETCHING_COURSEGRADES:
      return {
        ...state,
        startedFetching: false,
        finishedFetching: true,
      };
    default:
      return state;
  }
};

export default coursegrades;
