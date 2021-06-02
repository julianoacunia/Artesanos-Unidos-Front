import * as React from 'react';
import renderer from 'react-test-renderer';
import RefreshButton from './refresh-button';

describe('Submit button', () => {
  test('should match snapshot and styles', () => {
    const tree = renderer
    .create(<RefreshButton
      testId={'test'}
      text={'test'}
      onClick={() => 'test'}
    />)
    .toJSON();
      expect(tree).toMatchSnapshot();
  });
});