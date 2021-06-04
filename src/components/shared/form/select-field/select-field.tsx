import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { getColor } from '../../../../helpers/utils';
import Select from '@material-ui/core/Select';
import { WrappedFieldProps } from 'redux-form';
import css from './select-field.module.css';

interface TextFieldProps extends WrappedFieldProps {
  options: SelectOption[];
  label: string;
  disabled?: boolean;
  testId?: string;
}

export interface SelectOption {
  value: string;
  label: string;
  disable?: boolean;
}

const CssSelect = withStyles(() => ({
  root: {
    height: 23,
    fontSize: 13,
    '& .MuiSelect-underline(.Mui-error):after': {
      borderBottomColor: getColor('--color-red'),
    },
  },
}))(Select);

const CssInputLabel = withStyles(() => ({
  root: {
    '& .MuiSelect-underline(.Mui-error):after': {
      color: getColor('--color-red'),
    },
  },
}))(InputLabel);

const SelectField = (
  {
    label,
    options,
    input,
    meta: { touched, error },
    disabled,
    testId
  }: TextFieldProps,
) => {

  return (
    <FormControl className={css.formControl}>
      <CssInputLabel
        error={!!(touched && error)}
        id="select">{label}
      </CssInputLabel>
      <CssSelect
        error={!!(touched && error)}
        labelId="select"
        id="select"
        disabled={disabled}
        {...input}
        test-id={testId}
      >
        {options.map((option: SelectOption) =>
          <MenuItem
            key={option.value}
            value={option.value}
            test-id={option.label}
            disabled={option.disable}
          >
            {option.label}
          </MenuItem>)}
      </CssSelect>
      <div className={css.textFieldGroupError}>
        {!!(touched && error) && (error)}
      </div>
    </FormControl>
  );
};

export default SelectField;