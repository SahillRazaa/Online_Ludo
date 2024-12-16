import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const useGame = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
  
  const initialPlayerOrder = ['red', 'blue', 'yellow', 'green'];

  const [currDice, setCurrDice] = useState(0);
  const [tempCurrDice, setTempCurrDice] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [playerPositions, setPlayerPositions] = useState({
    red: [17, 62, 65, 20],
    blue: [26, 71, 74, 29],
    yellow: [161, 206, 209, 164],
    green: [152, 197, 200, 155]
  });
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [playerOrder, setPlayerOrder] = useState(initialPlayerOrder);
  const [rankings, setRankings] = useState(new Set());
  const [winners, setWinners] = useState(new Set());

  const restartGame = () => {
    const confirmRestart = window.confirm("Are you sure you want to restart the game?");
    if (confirmRestart) {
      setCurrDice(0);
      setTempCurrDice(0);
      setCurrentPlayer('red');
      setPlayerPositions({
        red: [17, 62, 65, 20],
        blue: [26, 71, 74, 29],
        yellow: [161, 206, 209, 164],
        green: [152, 197, 200, 155]
      });
      setCurrentPlayerIndex(0);
      setPlayerOrder(['red', 'blue', 'yellow', 'green']);
      setRankings(new Set());
      setWinners(new Set());
      localStorage.removeItem('ludoGameState');
    }
  };

  return (
    <GameContext.Provider value={{
      currDice,
      setCurrDice,
      tempCurrDice,
      setTempCurrDice,
      currentPlayer,
      setCurrentPlayer,
      playerPositions,
      setPlayerPositions,
      currentPlayerIndex,
      setCurrentPlayerIndex,
      playerOrder,
      setPlayerOrder,
      rankings,
      setRankings,
      winners,
      setWinners,
      restartGame
    }}>
      {children}
    </GameContext.Provider>
  );
};