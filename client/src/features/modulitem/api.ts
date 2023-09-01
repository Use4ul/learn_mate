import { Module } from './types/types';

export const fetchModules = async (): Promise<Module[]> => {
  const res = await fetch('/api/modules');
  return res.json();
};
