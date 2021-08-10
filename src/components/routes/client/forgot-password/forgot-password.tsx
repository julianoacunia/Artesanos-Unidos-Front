import React from 'react'
import { Link } from 'react-router-dom'
import css from './forgot-password.module.css';
import { ReduxProps } from '.'
import TextField from '../../../shared/form/text-field';
import { Field } from 'redux-form';
import { required } from '../../../../helpers/form/validators';
import Button from '@material-ui/core/Button'

const ForgotPassword: React.FC<ReduxProps> = (props) => {
  const { handleSubmit } = props;
  return (
    <>
      <div className={css.container}>
        <div className={css.form}>
          <Field
            name="dni"
            label="D.N.I"
            component={TextField}
            validate={[required()]}
            required={true}
          />
          <Button
            className={css.cancelButton} onClick={handleSubmit}
          > Enviar</Button>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword;