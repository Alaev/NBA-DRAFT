import React, { ChangeEventHandler } from 'react';

interface Props {
  label: string;
  onChange: ChangeEventHandler;
  value: string;
}

export default React.memo(function Input(props: Props) {
  const { label } = props;

  return (
    <>
      <label>{label}: </label>
      <input
        className="px-1 text-gray-700 border border-blue-900 focus:outline-none focus:border-blue-500"
        {...props}
      />
    </>
  );
});
