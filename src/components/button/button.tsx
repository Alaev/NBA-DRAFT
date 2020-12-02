import React from 'react';
import classnames from 'classnames';

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default React.memo(function Button({
  children,
  className,
  onClick,
}: Props) {
  const classNames = classnames(
    'py-1 px-1 ml-2 text-sm focus:outline-none',
    className
  );

  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  );
});
