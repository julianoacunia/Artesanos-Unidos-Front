import * as React from 'react';
import renderer from 'react-test-renderer';
import ImageField from './';

describe('Image Field', () => {
  const dispatch = jest.fn();
  test('should match snapshot and styles', () => {
    const tree = renderer
    .create(
      <ImageField
        input={{
          value: 'test',
          onBlur: () => ({}),
          onChange: () => ({}),
          name: 'test',
          onDragStart: () => ({}),
          onDrop: () => ({}),
          onFocus: () => ({})
        }}
        meta={{
          autofilled: false,
          asyncValidating: false,
          dirty: false,
          dispatch,
          form: 'test',
          initial: 'test',
          invalid: false,
          pristine: false,
          submitting: false,
          submitFailed: false,
          touched: false,
          valid: false,
          visited: false,
        }}
      />
    )
    .toJSON();
      expect(tree).toMatchSnapshot();
  });
});