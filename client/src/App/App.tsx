/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from '../features/navbar/Navbar';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          {/* <Route path="/" element={<QuizePage />} />
          <Route path="/auth/register" element={<RegForm />} />
          <Route path="/auth/log" element={<LogForm />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
