import { useState, useEffect } from 'react';
import { IMovie } from '../types';

interface IUseFetch {
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  movies: IMovie[];
  loading: boolean;
  errorMessage: string | null;
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
    }

    const fetchData = async () => {
      const response = await fetch(url);
      const json = await response.json();
      console.log(response);
      console.log(json);

      json.Response === 'True' ? setMovies(json.Search) : setErrorMessage(json.Error);
      setLoading(false);
    };

    initState();
    fetchData();
  }, [url]);

  return { setUrl, movies, loading, errorMessage };
};

export default useFetch;
