import React, { ChangeEventHandler, useEffect, useRef } from 'react';
import { useClickAway } from 'react-use';
import Input from '../input/input';

interface Props {
  value: string;
  onChange: ChangeEventHandler;
  toggle: () => void;
}

export default function ColorModal({ value, onChange, toggle }: Props) {
  const ref = useRef(null);
  useClickAway(ref, () => {
    toggle();
  });

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.keyCode !== undefined) {
        if (event.keyCode === 27) {
          toggle();
        }
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [toggle]);

  return (
    <div ref={ref} className="text-gray-50 px-2 py-6 absolute top-12 -right-10 w-96 border bg-blue-900 border-yellow-400 hover:border-blue-400 hover:shadow-2xl shadow-md rounded-md">
      <Input label="HEX or color name" value={value} onChange={onChange} />
    </div>
  );
}
