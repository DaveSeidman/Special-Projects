import React, { useRef, useState, useEffect } from 'react';
import './index.scss';
import Scene from './components/scene';

function App() {

  const scroll = () => {
  }

  useEffect(() => {
    addEventListener('scroll', scroll);

    return () => {
      removeEventListener('scroll', scroll);
    }
  })

  return (
    <div className={`app`} >
      <Scene></Scene>

    </div>
  );
}

export default App;
