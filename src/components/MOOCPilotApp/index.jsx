import { MPCollectionChart } from '@moocpilot/analytics-components';
import '@moocpilot/analytics-components/dist/analytics-components.min.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import CohortSelector from '../CohortSelector/index';
import InstructorSettings from '../InstructorSettings';

class MOOCPilotApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCohorts: [],
      gradeThreshold: 0,
    };
    this.props.getCourseGrades();
    this.changeInstructorSettings = this.changeInstructorSettings.bind(this);
  }

  changeInstructorSettings(param) {
    if (param.selectedCohorts) {
      this.setState({ selectedCohorts: param.selectedCohorts });
      console.log(this.state.selectedCohorts);
    }
    if (param.gradeThreshold) {
      this.setState({ gradeThreshold: param.gradeThreshold });
    }
  }

  render() {
    let menu = '';
    let graph = (
      <div className="container">
        <p>Fetching grades</p>
      </div>);
    if (!this.props.startedFetching || this.props.finishedFetching) {
      if (this.props.coursegrades) {
        const gthreshold = this.state.gradeThreshold;
        const filteredgrades = this.props.coursegrades.grades.filter(g => g.value > gthreshold
          && (this.state.selectedCohorts.length === 0 ||
              this.state.selectedCohorts.indexOf(g.cohort) !== -1));
        menu = (
          <InstructorSettings
            cohorts={this.props.coursegrades.cohorts}
            selectedCohorts={this.state.selectedCohorts}
            gradeThreshold={this.state.gradeThreshold}
            onInstructorSettingsChange={this.changeInstructorSettings}
          />);

        graph = (<MPCollectionChart
          collections={this.props.coursegrades.collections}
          activities={this.props.coursegrades.activities}
          students={this.props.coursegrades.students}
          cohorts={this.props.coursegrades.cohorts}
          grades={filteredgrades}
        />);
      } else {
        graph = (<p>No grades found!</p>);
      }
    }
    return (
      <div className="container">
        <div className="row">
          <div>
            {menu}
          </div>
          <div>
            {graph}
          </div>
        </div>
      </div>);
  }
}


MOOCPilotApp.defaultProps = {
  coursegrades: null,
  getCourseGrades: () => {
  },
  startedFetching: false,
  finishedFetching: false,
};

MOOCPilotApp.propTypes = {
  coursegrades: PropTypes.shape({
    collections: PropTypes.array,
    activities: PropTypes.array,
    students: PropTypes.array,
    grades: PropTypes.array,
    cohorts: PropTypes.array,
  }),
  getCourseGrades: PropTypes.func,
  startedFetching: PropTypes.bool,
  finishedFetching: PropTypes.bool,
};

export default MOOCPilotApp;
