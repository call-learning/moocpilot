import coursegrades from './coursegrades';
import {
  STARTED_FETCHING_COURSEGRADES,
  FINISHED_FETCHING_COURSEGRADES,
} from '../constants/actionTypes/coursegrades';

const initialState = {
  coursegrades: [],
  startedFetching: false,
  finishedFetching: false,
};

describe('coursegrades reducer', () => {
  it('has initial state', () => {
    expect(coursegrades(undefined, {})).toEqual(initialState);
  });
  it('updates started fetching coursegrades state', () => {
    const expected = {
      ...initialState,
      startedFetching: true,
      finishedFetching: false,
    };
    expect(coursegrades(undefined, { type: STARTED_FETCHING_COURSEGRADES })).toEqual(expected);
  });
  it('updates finished fetching coursegrades state', () => {
    const expected = {
      ...initialState,
      startedFetching: false,
      finishedFetching: true,
    };
    expect(coursegrades(undefined, { type: FINISHED_FETCHING_COURSEGRADES })).toEqual(expected);
  });
});
