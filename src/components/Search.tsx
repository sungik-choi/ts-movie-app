import React, { useState } from 'react';

interface ISearchProps {
  search: (url: string) => void;
}

const Search = ({ search }: ISearchProps): JSX.Element => {
  const [value, setValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const callSearchFunction = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    search(value);
    setValue('');
  };

  return (
    <form className="search">
      <input value={value} onChange={handleInputChange} type="text" />
      <input onClick={callSearchFunction} type="submit" value="SEARCH" />
    </form>
  );
};

export default React.memo(Search);
