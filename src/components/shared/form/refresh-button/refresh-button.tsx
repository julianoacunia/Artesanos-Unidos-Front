import React from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';
import Button from '../button';

interface Props {
  testId?: string;
  disabled?: boolean;
  text?: string;
  onClick: HTMLButtonElement['onclick'];
}

const RefreshButton: React.FC<Props> = (props) => {

  const {
    onClick,
    disabled,
    testId,
    text
  } = props;

  return (
    <Button
      text={text || 'Actualizar'}
      testId={testId || 'refresh-button'}
      onClick={onClick}
      disabled={disabled}
      icon={<RefreshIcon />}
    />
  );
};

export default RefreshButton;