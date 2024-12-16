import React from "react";
import HomePage from "./Pages/HomePage";
import { GameProvider } from './GameContext'; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Congratulations from "./Pages/WinnerPage";

const App = () => {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element = {<HomePage/>}/>
          <Route path="/winner" element = {<Congratulations/>}/>
        </Routes>
      </Router>
    </GameProvider>
  );
};

export default App;
