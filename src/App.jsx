import React, { useRef, useState, useEffect } from 'react';
import './index.scss';
import Scene from './components/scene';
import logo from './assets/images/logo.png';

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
      <img className="logo" src={logo} />
    </div>
  );
}

export default App;
