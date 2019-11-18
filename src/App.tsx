import * as React from 'react';
import './App.css';
import { PathFinder } from './components';

const App: React.FC = () => {
  return (
    <div className="App background">
      <header className="App-header">
        <div className="title">Pathfinding Vizualizer</div>
        <PathFinder />
      </header>
    </div>
  );
};

export default App;
