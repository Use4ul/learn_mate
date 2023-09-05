type Action = 
| { type: 'card/loadProgress'; payload: number }
| { type: 'cards/sendAnswer'; payload: number };

export default Action;
