import { MPCollectionChart } from '@moocpilot/analytics-components';
import '@moocpilot/analytics-components/dist/analytics-components.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
    if (param.cohort) {
      const cohortList = this.state.selectedCohorts;
      this.state.selectedCohorts.forEach((element, index) => {
        if (element === param.cohort) {
          cohortList[index].selected = true;
        } else {
          cohortList[index].selected = false;
        }
      });
      this.setState({ cohortSelection: cohortList });
      console.log(this.state.cohortSelection);
    }
    if (param.gradeThreshold) {
      this.setState({ gradeThreshold: param.gradeThreshold });
    }
  }

  render() {
    let menu = '';
    let graph = (
      <Container>
        <p>Fetching grades</p>
      </Container>);

    if (!this.props.startedFetching || this.props.finishedFetching) {
      if (this.props.coursegrades) {
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
          grades={this.props.coursegrades.grades}
        />);
      } else {
        graph = (<p>No grades found!</p>);
      }
    }
    return (
      <Container>
        <Row>
          <Col />
        </Row>
        <Row>
          <Col>
            {menu}
          </Col>
          <Col>
            {graph}
          </Col>
        </Row>
      </Container>);
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
