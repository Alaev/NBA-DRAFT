import React, { ChangeEventHandler } from 'react';

interface Props {
  text?: string;
  onChange: ChangeEventHandler;
  value: string;
}

export default function Input({ text, onChange, value }: Props) {
  return (
    <>
      <label>{text}:{' '}</label>
      <input
        className="px-1 text-gray-700 focus:outline-none border border-blue-900 focus:border-blue-500"
        onChange={onChange}
        value={value}
      />
    </>
  );
}

Input.defaultProps = {
  text: 'Filter',
  value: '',
};
