import React, { useState } from 'react';
import './Search.css';

interface ISearchProps {
  search: (url: string) => void;
}

const Search = ({ search }: ISearchProps): JSX.Element => {
  const [value, setValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const clearInputValue = () => setValue('');

  const callSearchFunction = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    search(value);
    clearInputValue();
  };

  return (
    <form className="search">
      <input value={value} onChange={handleInputChange} type="text" />
      <input onClick={callSearchFunction} type="submit" value="SEARCH" />
    </form>
  );
};

export default React.memo(Search);
