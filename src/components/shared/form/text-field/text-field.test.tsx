import * as React from 'react';
import renderer from 'react-test-renderer';
import TextField from './text-field';

describe('Submit button', () => {
  const dispatch = jest.fn();
  test('should match snapshot and styles', () => {
    const tree = renderer
      .create(
        <TextField
          maxLength={10}
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
          testId="test"
          multiline={false}
          type="text"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});