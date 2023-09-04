import { Card } from './types';

type Action = { type: 'cards/load'; payload: Card[] };

export default Action;
