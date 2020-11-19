import React, { useRef } from 'react';

interface ISearchProps {
  search: (url: string) => void;
}

const Search = ({ search }: ISearchProps): JSX.Element => {
  const inputEl = useRef<HTMLInputElement>(null);

  const callSearchFunction = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (inputEl.current !== null) {
      search(inputEl.current.value);
      inputEl.current.value = '';
    }
  };

  return (
    <form className="search">
      <input ref={inputEl} type="text" />
      <input onClick={callSearchFunction} type="submit" value="SEARCH" />
    </form>
  );
};

export default React.memo(Search);
