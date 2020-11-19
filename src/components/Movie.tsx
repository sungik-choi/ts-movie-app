import React from 'react';
import { IMovie } from '../types';

interface IMovieProps {
  movie: IMovie;
}

const Movie = ({ movie }: IMovieProps): JSX.Element => {
  const poster =
    movie.Poster === 'N/A'
      ? process.env.REACT_APP_PLACEHOLDER_IMG
      : movie.Poster;

  return (
    <div className="movie">
      <h2>{movie.Title}</h2>
      <div>
        <img
          width="200"
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
      </div>
      <p>({movie.Year})</p>
    </div>
  );
};

export default Movie;
