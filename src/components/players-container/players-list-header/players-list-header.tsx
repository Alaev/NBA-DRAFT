import React, { useState } from 'react';
import Input from '../../input/input';
import Loading from '../../loading/loading';
import EditButton from './edit-button';

interface Configuration {
  isLoading?: boolean;
  isFilterable?: boolean;
  isEditable?: boolean;
}
interface Props {
  configuration: Configuration;
  title?: string;
  toggleModal: () => void;
  filterPlayersByText: (text: string) => void;
}

export default React.memo(function PlayersListHeader({
  configuration: { isLoading, isFilterable, isEditable },
  toggleModal,
  filterPlayersByText,
  title,
}: Props) {
  const [searchTherm, setSearchTherm] = useState('');

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTherm(e.target.value);
    filterPlayersByText(e.target.value);
  };

  return (
    <div className="sticky top-0 px-4 py-2 font-medium text-blue-900 uppercase bg-yellow-400 border-b-2 border-blue-900 h-11 rounded-t-md">
      {isLoading && <Loading />}
      {isFilterable ? (
        <Input
          label="filter"
          value={searchTherm}
          onChange={handleFilter}
          data-testid="players-filter"
        />
      ) : (
        <div>{title}</div>
      )}
      {isEditable && <EditButton handleEdit={toggleModal} />}
    </div>
  );
});
