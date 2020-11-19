import { useState, useEffect } from 'react';

interface IState<T> {
  setRequest: React.Dispatch<React.SetStateAction<RequestInfo>>;
  response: T | null;
  loading: boolean;
  errorMessage: string | null;
}

const useFetch = <T>(url: RequestInfo): IState<T> => {
  const [request, setRequest] = useState(url);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<T | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const initState = () => {
      setLoading(true);
      setErrorMessage(null);
    };

    const fetchData = async (): Promise<void> => {
      const res = await fetch(request);
      const json = await res.json();
      const { Response, Search, Error } = json;

      Response === 'True' ? setResponse(Search) : setErrorMessage(Error);
      setLoading(false);
    };

    initState();
    fetchData();
  }, [request]);

  return { setRequest, response, loading, errorMessage };
};

export default useFetch;
