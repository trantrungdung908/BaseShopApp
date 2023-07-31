import {useAsyncEffect} from '@dwarvesf/react-hooks';
import {useState} from 'react';

type Fetcher<Data> = (...args: any) => Data | Promise<Data>;

export default function useFetch<Data = any, Error = any>(
  fetcher: Fetcher<Data>,
  deps: any[],
) {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const isFirstLoading = data === null && error === null;
  const [isLoading, setIsLoading] = useState(true);

  useAsyncEffect(async () => {
    setIsLoading(true);
    try {
      const data_fetcher = await fetcher();
      setData(data_fetcher);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, deps);

  return {data, error, isFirstLoading, isLoading};
}
