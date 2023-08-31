/* eslint-disable no-undef */
import React from 'react';
import './App.css';
import myImage from '../public/learn_mate_main.png';

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Катя, Варя, Рустам</h2>
        <img src={myImage} className="App-logo" alt="logo" />
        <h2>Welcome to LearnMate!</h2>
      </header>
    </div>
  );
}

export default App;
