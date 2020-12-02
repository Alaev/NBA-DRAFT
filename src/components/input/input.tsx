import React, { ChangeEventHandler } from 'react';

interface Props {
  label: string;
  onChange: ChangeEventHandler;
  value: string;
}

export default React.memo(function Input({ label, onChange, value }: Props) {
  return (
    <>
      <label>{label}:{' '}</label>
      <input
        className="px-1 text-gray-700 focus:outline-none border border-blue-900 focus:border-blue-500"
        onChange={onChange}
        value={value}
      />
    </>
  );
})
