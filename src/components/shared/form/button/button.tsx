import React from 'react';
import css from './button.module.css';
import ButtonMaterial from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import cx from 'classnames';

interface Props {
  testId?: string;
  styles?: string;
  disabled?: boolean;
  submitting?: boolean;
  text?: React.ReactNode | string;
  onClick: any;
  cancel?: boolean;
  icon?: React.ReactNode | string;
  type?: 'cancel' | 'submit' | 'validate';
}

const SubmitButton: React.FC<Props> = (props) => {
  const {
    text,
    testId,
    styles,
    onClick,
    disabled,
    submitting,
    icon,
    type = 'button',
  } = props;

  const typeStyles = React.useMemo(() => {
    if (disabled || submitting) {
      return css.disabledButton;
    } else if (type === 'button' || type === 'submit') {
      return css.submitButton;
    } else if (type === 'cancel') {
      return css.cancelButton;
    } else if (type === 'validate') {
      return css.validateButton;
    }
  }, [type, disabled, submitting]);

  return (
    <ButtonMaterial
      test-id={testId}
      type={type === 'submit' ? type : 'button'}
      variant="contained"
      onClick={onClick}
      className={cx(css.button, typeStyles, styles)}
      disabled={disabled || submitting}
      startIcon={icon}
    >
      {submitting ? (<CircularProgress size={10} />) : text}
    </ButtonMaterial>
  );
};

export default SubmitButton;