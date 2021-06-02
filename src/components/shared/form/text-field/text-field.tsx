import React, { useState } from 'react';
import TextFieldMaterial from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { WrappedFieldProps } from 'redux-form';
import { getColor } from '../../../../helpers/utils';
import css from './text-field.module.css';
import InputAdornmentMaterial from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import cx from 'classnames';

export interface TextFieldProps extends WrappedFieldProps {
  maxLength: number;
  testId: string;
  multiline: boolean;
  icon?: React.ReactType<any>;
  errorStyle?: string;
  searchBar?: boolean;
  disabled?: boolean;
  type: string;
  copyToClipboardButton?: boolean;
}

const CssTextField = withStyles(() => ({
  root: {
    '& .MuiInputBase-input': {
      fontSize: 13,
      height: 23,
    },
    '& .MuiInput-multiline': {
      minHeight: 36,
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: getColor('--color-primary'),
    },
  },
}))(TextFieldMaterial);

const StartInputAdornment = withStyles(() => ({
  root: {
    marginRight: 10,
    color: getColor('--color-primary'),
    '& .MuiSvgIcon-root': {
      height: 15,
      width: 15,
    }
  },
}))(InputAdornmentMaterial);

const EndInputAdornment = withStyles(() => ({
  root: {
    color: getColor('--color-primary'),
    '& .MuiSvgIcon-root': {
      height: 15,
      width: 15,
    }
  },
})
)(InputAdornmentMaterial);

const TextField: React.FunctionComponent<TextFieldProps> = (
  {
    input,
    meta: {
      touched,
      error,
    },
    testId,
    icon: Icon,
    errorStyle,
    searchBar,
    disabled,
    type,
    copyToClipboardButton,
    ...custom
  },
) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cx({
      [css.quantityInput]: !searchBar && custom.multiline,
      [css.textFieldGroup]: !searchBar && !custom.multiline
    })}>
      <CssTextField
        error={!!(touched && error)}
        inputProps={{
          maxLength: custom.maxLength || 50
        }}
        test-id={testId}
        InputProps={{
          startAdornment: Icon ?
            (
              <StartInputAdornment position="start" >
                <Icon />
              </StartInputAdornment>
            ) : undefined,
          endAdornment: type === 'password' ?
            (<>
              <EndInputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </EndInputAdornment >
              {copyToClipboardButton &&
                <EndInputAdornment position="end">
                  <IconButton
                    aria-label="copy to clipboard"
                    onClick={() => navigator.clipboard.writeText(input.value)}
                  >
                    <FileCopyIcon />
                  </IconButton>
                </EndInputAdornment >}
            </>
            ) : undefined
        }}
        type={type === 'password' ? showPassword ? 'text' : 'password' : type}
        disabled={disabled}
        {...input}
        {...custom}
      />
      <div className={cx(css.textFieldGroupError, errorStyle)}>
        {!!(touched && error) && (error)}
      </div>
    </div >
  );
};

export default TextField;