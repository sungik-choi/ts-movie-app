import { useState, useEffect } from 'react';

interface IState<T> {
  setRequest: React.Dispatch<React.SetStateAction<RequestInfo>>;
  data: T | null;
  loading: boolean;
  errorMessage: string | null;
}

const useFetch = <T>(url: RequestInfo): IState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [request, setRequest] = useState(url);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const initState = () => {
      setLoading(true);
      setErrorMessage(null);
    };

    const fetchData = async (): Promise<void> => {
      const response = await fetch(request);
      const json = await response.json();
      const { Response, Search, Error } = json;

      Response === 'True' ? setData(Search) : setErrorMessage(Error);
      setLoading(false);
    };

    initState();
    fetchData();
  }, [request]);

  return { setRequest, data, loading, errorMessage };
};

export default useFetch;
