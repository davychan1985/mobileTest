import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../configs/constants';

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(url: string, dependencies: any[] = []) {
  const [result, setResult] = useState<FetchResult<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${url}`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        setResult({ data, loading: false, error: null });
      } catch (err) {
        setResult({
          data: null,
          loading: false,
          error: err instanceof Error ? err.message : 'Unknown error',
        });
      }
    };

    fetchData();
  }, dependencies);

  return result;
}