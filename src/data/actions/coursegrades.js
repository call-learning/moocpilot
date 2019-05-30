import {
  getGradeReportsFromLocalFolder,
  getGradeReportsFromAPI,
  parseGradeReports,
  getCourseIDFromURL,
  getCollectionFromFilename,
} from '@moocpilot/tools';

import {
  STARTED_FETCHING_COURSEGRADES,
  FINISHED_FETCHING_COURSEGRADES,
  GET_COURSEGRADES,
} from '../constants/actionTypes/coursegrades';

const startedFetchingCourseGrades = () => (
  {
    type: STARTED_FETCHING_COURSEGRADES,
  }
);

const finishedFetchingCourseGrades = () => (
  {
    type: FINISHED_FETCHING_COURSEGRADES,
  }
);

const getCourseGrades = coursegrades => (
  {
    type: GET_COURSEGRADES,
    coursegrades,
  }
);

const fetchCourseGrades = () => (
  async (dispatch) => {
    dispatch(startedFetchingCourseGrades());
    let reportlist = null;
    if (process && process.env) {
      switch (process.env.NODE_ENV) {
        case 'test': {
          // Here we only process local folder, no API
          const gradepath = './tests/sampledata/gradereports/';
          // Fetch the files locally in the test folder.
          reportlist = await getGradeReportsFromLocalFolder(gradepath);
          break;
        }
        case 'development': {
          const currenturl = new URL(window.location.href);
          reportlist = await getGradeReportsFromAPI(
            `${currenturl.protocol}//${currenturl.host}`,
            'devcourse',
          );
          break;
        }
        default: {
          if (typeof window !== 'undefined' && window.document && window.document.createElement) {
            // We are in the browser and supposedly logged in.
            const currenturl = new URL(window.location.href);
            reportlist = await getGradeReportsFromAPI(
              `${currenturl.protocol}//${currenturl.host}`,
              getCourseIDFromURL(currenturl),
            );
          }
        }
      }
    }
    if (reportlist) {
      // TODO: we limit the number of reports if this value is defined
      // TODO : rework this part
      let LIMITREPORTPERWEEK=true;
      if (typeof LIMITREPORTPERWEEK !== 'undefined' && LIMITREPORTPERWEEK) {
        reportlist = reportlist.sort((r1, r2) => r1.name.localeCompare(r2.name));
        console.log(reportlist);
        reportlist = Array.from(reportlist).filter((value, index, array) => {
          if (index === 0) return true;
          const WEEKLAPSE = 604800000;
          const thiscollection = getCollectionFromFilename(value.name);
          const lastcollection = getCollectionFromFilename(array[index - 1].name);
          if ((thiscollection.timestamp - lastcollection.timestamp) > WEEKLAPSE) {
            return true;
          }
          return false;
        });
        console.log(reportlist);
      }
      return parseGradeReports(reportlist)
        .then((grades) => {
          dispatch(getCourseGrades(grades));
          dispatch(finishedFetchingCourseGrades());
        });
    }
    dispatch(getCourseGrades(null));
    dispatch(finishedFetchingCourseGrades());
    return null;
  }
);

export {
  startedFetchingCourseGrades,
  finishedFetchingCourseGrades,
  getCourseGrades,
  fetchCourseGrades, // Used in the tests
};
