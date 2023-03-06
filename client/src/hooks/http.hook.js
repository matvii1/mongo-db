import { useCallback, useState } from "react";

const BASE = "http://localhost:2501";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = {
        "Content-Type": "application/json",
      }
    ) => {
      setLoading(true);

      if (body) {
        body = JSON.stringify(body);
      }

      try {
        const res = await fetch(BASE + url, { method, body, headers });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "sth went wrong!!");
        }

        return data;
      } catch (error) {
        setError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearError = () => setError(null);

  return { loading, request, error, clearError };
};
