import React from 'react';
import { shallow } from 'enzyme';

import MOOCPilotGraphPage from './index';

describe('correctly renders', () => {
  it('renders MOOCPilotAppPage Page', () => {
    const wrapper = shallow(<MOOCPilotGraphPage />);
  });
});

