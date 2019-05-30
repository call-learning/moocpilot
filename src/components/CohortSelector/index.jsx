import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Simple tool to select a cohort
 */
class CohortSelector extends Component {
  constructor(props) {
    super(props);
    // Bind the event so 'this' is working correctly in the call
    this.selectCohorts = this.selectCohorts.bind(this);
  }

  selectCohorts(e) {
    const cohortids = Array.from(e.target.selectedOptions).reduce((acc, val) => {
      if (val.value !== 'all') {
        acc.push(Number.parseInt(val.value,10));
      } else {
        return []; // Nullify selection if we have selected all
      }
      return acc;
    }, []);

    this.props.onCohortSelectionChange(cohortids);
  }

  render() {
    const OPTION_ALL = [<option key="all" value="all">All</option>];
    const selectedId = 0;
    const optionList = this.props.cohorts.map(c =>
      (<option
        key={c.id}
        value={c.id}
        defaultChecked={this.props.selectedCohorts.indexOf(c.id) !== -1}
      > {c.name}
      </option>));

    return (
      <div>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <select multiple onChange={this.selectCohorts} defaultValue={this.props.selectedCohorts}>
          {[...OPTION_ALL, ...optionList]}
        </select>
      </div>
    );
  }
}


CohortSelector.defaultProps = {
  cohorts: [],
  selectedCohorts: [],
  onCohortSelectionChange: null,
};

CohortSelector.propTypes = {
  cohorts: PropTypes.arrayOf(PropTypes.object),
  selectedCohorts: PropTypes.arrayOf(PropTypes.number),
  onCohortSelectionChange: PropTypes.func,
};


export default CohortSelector;
