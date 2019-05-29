import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CohortSelector from '../CohortSelector/index';

/**
 * Simple tool to select a cohort and a grade threshold
 */
class InstructorSettings extends Component {
  constructor(props) {
    super(props);
    this.cohortSelectionChange = this.cohortSelectionChange.bind(this);
    this.thresholdChange = this.thresholdChange.bind(this);
  }

  thresholdChange(e) {
    this.props.onInstructorSettingsChange({ gradeThreshold: Number(e.target.value) });
  }

  cohortSelectionChange(cohortName) {
    this.props.onInstructorSettingsChange({ cohort: cohortName });
  }

  render() {
    return (
      <div>
        <span>Instructor settings</span>
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
          <label>Grade threshold:<input
            step="0.1"
            value={this.props.gradeThreshold}
            type="number"
            min="0"
            max="1"
            onChange={this.thresholdChange}
          />
          </label>
        </div>
        <CohortSelector
          cohortList={this.props.cohorts}
          onCohortSelectionChange={this.cohortSelectionChange}
        />
      </div>
    );
  }
}


InstructorSettings.defaultProps = {
  gradeThreshold: 0,
  cohorts: [],
  onInstructorSettingsChange: () => {
  },
};

InstructorSettings.propTypes = {
  gradeThreshold: PropTypes.number,
  cohorts: PropTypes.arrayOf(PropTypes.object),
  onInstructorSettingsChange: PropTypes.func,
};


export default InstructorSettings;
