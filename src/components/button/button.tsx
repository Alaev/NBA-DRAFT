import React from 'react';
import classnames from 'classnames';

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  testId?: string;
}

export default React.memo(function Button({
  children,
  className,
  onClick,
  testId,
}: Props) {
  const classNames = classnames(
    'py-1 px-1 ml-2 text-sm focus:outline-none',
    className
  );

  return (
    <button className={classNames} onClick={onClick} data-testid={testId}>
      {children}
    </button>
  );
});
