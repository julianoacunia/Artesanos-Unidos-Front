import React, { useRef, useCallback, useState } from 'react';
import css from './image-field.module.css';
import { WrappedFieldProps } from 'redux-form';
import Close from '@material-ui/icons/Close';
import AddPhotoAlternate from '@material-ui/icons/AddPhotoAlternate';
import cx from 'classnames';

interface Props extends WrappedFieldProps {
  disabled?: boolean;
  testId?: string;
  sizeLimit?: number;
}

const ImageField: React.FC<Props> = (props) => {

  const {
    input,
    disabled,
    meta: {
      touched,
      error,
      submitFailed
    },
    testId,
    sizeLimit = 5120, // 5MB
  } = props;

  const inputEl: any = useRef({ current: {} });

  interface State {
    filesizeError: string;
  }
  const [filesizeError, changeFilesizeError] = useState<State['filesizeError']>('');

  const handleInput = useCallback((event) => {
    const file = event.target.files[0];
    if (file && file.size < sizeLimit * 1024) {
      input.onChange({
        url: URL.createObjectURL(file),
        file,
        isNew: true,
      });
      changeFilesizeError('');
    }
    else {
      changeFilesizeError(`Debe pesar menos de ${sizeLimit / 1024} MB`);
    }
  }, [input, sizeLimit]);

  const removeFile = useCallback((e: any) => {
    e.stopPropagation();
    URL.revokeObjectURL(input.value.url);
    input.onChange(null);
  }, [input]);

  const onClick = useCallback(() => {
    inputEl.current.value = null;
    inputEl.current.click();
  }, [inputEl]);

  return (
    <div className={css.container}>
      <input
        type="file"
        ref={inputEl}
        multiple={false}
        accept="image/png, image/jpeg"
        onChange={handleInput}
        className={css.input}
        test-id={testId}
      />
      <button
        className={cx(
          css.containerPreview,
          {
            [css.error]: (filesizeError || (touched && error && submitFailed))
          })}
        onClick={onClick}
        disabled={disabled}
      >
        {
          input.value.url
            ? (
              <img
                alt={''}
                className={css.imagePreview}
                src={input.value.url}
              />
            )
            : (<AddPhotoAlternate fontSize={'large'} />)
        }
      </button>
      {!disabled && (input.value.url || input.value.file) && (
        <button
          className={css.closeButton}
          onClick={removeFile}
          disabled={disabled}
        >
          <Close />
        </button>
      )}
      <div className={css.imageFieldGroupError}>
        {filesizeError || ((touched && error && submitFailed) && error)}
      </div>
    </div>
  );
};

export default ImageField;