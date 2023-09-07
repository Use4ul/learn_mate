type Action =
  | { type: 'card/loadProgress'; payload: number }
  | { type: 'cards/sendAnswer'; payload: number }
//   | { type: 'cards/setFlag'; payload: boolean };

export default Action;
