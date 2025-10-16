import { useEffect, useState } from "react";

function useCountDown(
  value: number = 0,
  defaultValue: number = 0,
  step: number = 1,
  key: string = "count"
) {
  const [count, setCount] = useState(
    parseInt(sessionStorage.getItem(key) || defaultValue.toString())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - step);
    }, 1000);

    if (count === 0) clearInterval(interval);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    sessionStorage.setItem(key, count.toString());
  }, [count]);

  const reset = () => {
    setCount(value);
  };

  return [count, setCount, reset] as const;
}
export default useCountDown;
