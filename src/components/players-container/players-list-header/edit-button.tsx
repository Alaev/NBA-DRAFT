import React from 'react';
import Button from '../../button/button';
import GearIcon from '../../icon/gear-icon';
import Icon from '../../icon/icon';

interface Props {
  handleEdit: () => void;
}

export default function EditButton({ handleEdit }: Props) {
  return (
    <Button
      className="absolute top-1 right-1 bg-blue-900 text-white hover:bg-blue-700 rounded-full  hover:border-yellow-100"
      onClick={handleEdit}
    >
      <Icon>
        <GearIcon />
      </Icon>
    </Button>
  );
}
