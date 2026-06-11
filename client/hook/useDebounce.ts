import { useEffect } from "react";

const useDebounce = (fn: Function, dependencies: any[], delay: number) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      fn();
    }, delay);

    return () => clearTimeout(timeout);
  }, dependencies);
};

export default useDebounce;
