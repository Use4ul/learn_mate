/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef */
import { useLayoutEffect, useState } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem('userTheme') || 'Темная тема');

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('userTheme', theme);
  }, [theme]);

  return { theme, setTheme };
};

export default useTheme;
