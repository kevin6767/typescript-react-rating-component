import React from 'react';
import './App.css';
import RatingContainer from "./RatingContainer"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RatingContainer ratingCount={10} />
      </header>
    </div>
  );
}

export default App;
