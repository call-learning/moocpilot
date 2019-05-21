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
    let optionList=[];
    let selectedId = 0;
    this.props.cohortList.forEach((item, i) => {
      optionList.push(<option key={i} value={i} >{item.name}</option>);
      if (item.selected) {
        selectedId = i;
      }
    });
    return (
      <div>
        <a>View a Cohort</a>
        <select onChange={this.changeCurrentCohort} defaultValue={selectedId}>
          {optionList}
        </select>
      </div>
    );
  }
}


CohortSelector.defaultProps = {
  cohortList: [],
  onCohortChange: () => {},
};

CohortSelector.propTypes = {
  cohortList: PropTypes.arrayOf(PropTypes.object),
  onCohortSelectionChange: PropTypes.func,
};


export default CohortSelector;
