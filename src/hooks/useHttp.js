import { useCallback, useState } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}, credentials = 'include') => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers['Content-Type'] = 'application/json';
        }
        const response = await fetch(url, { method, body, headers, credentials });
        const {status} = response;
        const data = await response.json();

        setLoading(false);
        return { data, status };
      } catch (error) {
        const data = [];
        const status = error;
        setLoading(false);
        setError(error.message);
        return { data, status };
      }
    },
    [],
  );

  return { loading, request, error };
};
