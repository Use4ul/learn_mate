/* eslint-disable no-undef */
import { useLayoutEffect, useState } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState('dark');

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return { theme, setTheme };
};

export default useTheme;
