import * as React from 'react';
import './App.css';
import PathFinder from './components/PathFinder';

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

// interface User {
//   name: string;
//   age?: number;
// }

// function add(x: number, y: number): number {
//   return x + y;
// }

// function printUser(user: User): void {
//   console.log(user);
// }

// const emma = {
//   name: 'emma',
// };

// interface UserWithRole extends User {
//   role: string;
// }

// printUser(emma);

// const u: UserWithRole = {
//   name: 'Alden',
//   age: 24,
//   role: 'hi',
// };

export default App;
