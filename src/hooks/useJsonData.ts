import { useState, useEffect } from 'react';

const cache: Record<string, any> = {};

export function useJsonData<T>(key: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!cache[key]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!key) return;

    // 1. 캐시 확인
    if (cache[key]) {
      setData(cache[key]);
      setLoading(false);
      return;
    }

    // 2. Fetch 실행
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/data/${key}.json`);

        if (!response.ok) {
          throw new Error(`데이터를 찾을 수 없습니다: ${key}.json`);
        }

        const jsonData = await response.json();

        // 3. 캐시 저장
        cache[key] = jsonData;
        setData(jsonData);
      } catch (err: any) {
        console.error(`[useJsonData] Error loading ${key}:`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [key]);

  return { data, loading, error };
}
