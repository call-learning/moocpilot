import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  FINISHED_FETCHING_COURSEGRADES,
  STARTED_FETCHING_COURSEGRADES,
} from '../constants/actionTypes/coursegrades';
import {
  fetchCourseGrades,
  finishedFetchingCourseGrades,
  startedFetchingCourseGrades,
} from './coursegrades';

const mockStore = configureMockStore([thunk]);

describe('actions', () => {
  it('sends started fetching coursegrades action', () => {
    const expected = { type: STARTED_FETCHING_COURSEGRADES };
    expect(startedFetchingCourseGrades())
      .toEqual(expected);
  });

  it('sends finished fetching coursegrades', () => {
    const expected = { type: FINISHED_FETCHING_COURSEGRADES };
    expect(finishedFetchingCourseGrades())
      .toEqual(expected);
  });


  it('fetching coursegrades', () => {
    const store = mockStore({ coursegrades: {} });
    return store.dispatch(fetchCourseGrades())
      .then(() => {
        expect(store.getActions())
          .toContainEqual({ type: STARTED_FETCHING_COURSEGRADES });
        expect(store.getActions())
          .toContainEqual({ type: FINISHED_FETCHING_COURSEGRADES });
      });
  }, 30000);
  // We add some large timeout here, just to prevent the test from failing because
  // of the CSV parsing
});
