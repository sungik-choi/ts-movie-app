import React, { useCallback } from 'react';
import './App.css';
import Header from './components/Header';
import Movie from './components/Movie';
import Search from './components/Search';
import { IMovie } from './types';
import useFetch from './hooks/useFetch';

const MOVIE_API_URL = 'https://www.omdbapi.com/?s=man&apikey=4a3b711b';

const App = (): JSX.Element => {
  const { setUrl, movies, loading, errorMessage } = useFetch(MOVIE_API_URL);

  const search = useCallback(
    (searchValue: string) =>
      setUrl(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`),
    [setUrl],
  );

  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favorite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie: IMovie, index: number) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
