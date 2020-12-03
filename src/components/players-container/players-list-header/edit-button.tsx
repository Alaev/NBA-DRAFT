import React from 'react';
import Button from '../../button/button';
import GearIcon from '../../icon/gear-icon';
import Icon from '../../icon/icon';

interface Props {
  handleEdit: () => void;
}

export default React.memo(function EditButton({ handleEdit }: Props) {
  return (
    <Button
      className="absolute text-white bg-blue-900 rounded-full top-1 right-1 hover:bg-blue-700 hover:border-yellow-100"
      onClick={handleEdit}
      testId="edit-background-button"
    >
      <Icon>
        <GearIcon />
      </Icon>
    </Button>
  );
});
