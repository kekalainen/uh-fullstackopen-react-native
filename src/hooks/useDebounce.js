import { useEffect, useState } from 'react';

const useDebounce = (newValue, delay = 500) => {
  const [value, setValue] = useState(newValue);

  useEffect(() => {
    const timeout = setTimeout(() => setValue(newValue), delay);

    return () => clearTimeout(timeout);
  }, [newValue]);

  return [value];
};

export default useDebounce;
