import * as React from 'react';
import './App.css';
import { PathFinder } from './components';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div>HELLO</div>
        <PathFinder />
      </header>
    </div>
  );
};

export default App;
