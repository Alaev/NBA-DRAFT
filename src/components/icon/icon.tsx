import React from 'react';
import classnames from 'classnames';

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export default React.memo(function Icon({children, className}: Props) {
  const classNames = classnames(
    'h-6 w-6',
    className,
  );
  return (
    <div className={classNames}>
     {children}
    </div>
  );
})
