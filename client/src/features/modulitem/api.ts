import { Module } from './types/types';

const fetchModules = async (): Promise<Module[]> => {
  const res = await fetch('/api/modules');
  return res.json();
};

export default fetchModules;
