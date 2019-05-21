import { connect } from 'react-redux';

import MOOCPilotApp from '../../components/MOOCPilotApp';
import { fetchCourseGrades } from '../../data/actions/coursegrades';

const mapStateToProps = state => (
  {
    coursegrades: state.cgstatus.coursegrades,
    startedFetching: state.cgstatus.startedFetching,
    finishedFetching: state.cgstatus.finishedFetching,
  }
);

const mapDispatchToProps = dispatch => (
  {
    getCourseGrades: () => dispatch(fetchCourseGrades()),
  }
);

const MOOCPilotAppPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MOOCPilotApp);

export default MOOCPilotAppPage;
