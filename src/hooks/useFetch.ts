import { useState, useEffect } from 'react';
import { IMovie } from '../types';

interface IUseFetch {
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  movies: IMovie[];
  loading: boolean;
  errorMessage: string | null;
}

interface IResponse {
  Response: string;
  Search?: IMovie[];
  Error?: string | null;
  totalResults?: number;
}

const useFetch = (URL: string): IUseFetch => {
  const [url, setUrl] = useState(URL);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const initState = () => {
      setLoading(true);
      setErrorMessage(null);
    };

    const fetchMovies = async (): Promise<void> => {
      const response = await fetch(url);
      const json: IResponse = await response.json();
      const { Response, Search = [], Error = null } = json;

      Response === 'True' ? setMovies(Search) : setErrorMessage(Error);
      setLoading(false);
    };

    initState();
    fetchMovies();
  }, [url]);

  return { setUrl, movies, loading, errorMessage };
};

export default useFetch;
