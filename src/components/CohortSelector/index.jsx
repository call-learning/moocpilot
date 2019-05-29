import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Simple tool to select a cohort
 */
class CohortSelector extends Component {
  constructor(props) {
    super(props);
    // Bind the event so 'this' is working correctly in the call
    this.changeCurrentCohort = this.changeCurrentCohort.bind(this);
  }

  changeCurrentCohort(e) {
    const cohortID = e.target.value;
    if (cohortID) {
      const cohortName = this.props.cohortList[cohortID];
      this.props.onCohortSelectionChange(cohortName);
    }
  }
  render() {
    const optionList = [];
    let selectedId = 0;
    this.props.cohortList.forEach((item, i) => {
      // eslint-disable-next-line react/no-array-index-key
      optionList.push(<option key={i} value={i} >{item.name}</option>);
      if (item.selected) {
        selectedId = i;
      }
    });
    return (
      <div>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#">View a Cohort</a>
        <select onChange={this.changeCurrentCohort} defaultValue={selectedId}>
          {optionList}
        </select>
      </div>
    );
  }
}


CohortSelector.defaultProps = {
  cohortList: [],
  onCohortSelectionChange: null,
};

CohortSelector.propTypes = {
  cohortList: PropTypes.arrayOf(PropTypes.object),
  onCohortSelectionChange: PropTypes.func,
};


export default CohortSelector;
