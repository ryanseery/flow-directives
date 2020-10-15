import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { flow } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<flow.div />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
