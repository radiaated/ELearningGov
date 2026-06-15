const useDebounce = (fn: Function, delay: number) => {
  const timeout = setTimeout(() => {
    fn();
  }, delay);

  return () => clearTimeout(timeout);
};

export default useDebounce;
