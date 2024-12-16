import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import DiceAnimate from '../assets/dice_animation.gif';
import Dice1 from '../assets/dice1.png';
import Dice2 from '../assets/dice2.png';
import Dice3 from '../assets/dice3.png';
import Dice4 from '../assets/dice4.png';
import Dice5 from '../assets/dice5.png';
import Dice6 from '../assets/dice6.png';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../GameContext';
import { screen1, screen2, screen3 } from '../responvise';

// Styled components
const Wrapper = styled.div`
  height: 100vh;
  background-color: #f0f0f0;
  display : flex;
  align-items : center;
  justify-content : center;
  ${screen1 ({
    flexDirection : 'column',
    height : 'auto',
  })}
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(15, 6vh);
  grid-template-rows: repeat(15, 6vh);
  gap: 2px;
  margin: 25px;
  flex: 1;
  ${screen2 ({
    gridTemplateColumns : 'repeat(15, 4vh)',
    gridTemplateRows : 'repeat(15, 4vh)',
  })}
  ${screen3 ({
    gridTemplateColumns : 'repeat(15, 3vh)',
    gridTemplateRows : 'repeat(15, 3vh)',
  })}
  
`;

const CellContainer = styled.div`
  width: 6vh;
  height: 6vh;
  background-color: lightgray;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  ${screen2 ({
    width : '4vh',
    height : '4vh',
  })}
  ${screen3 ({
    width : '3vh',
    height : '3vh',
  })}

`;

const Piece = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  z-index: 10;
  cursor: pointer;
  border: 2px solid white;
  font-size : 1.5rem;
  ${screen2 ({
    width : '25px',
    height : '25px',
    fontSize : '1rem',  
  })}
  ${screen3 ({
    width : '15px',
    height : '15px',
    fontSize : '0.8rem',  
  })}
 
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const PieceControlPanel = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Title = styled.h2`
  font-size: 40px;
  color: black;
  text-shadow : 10px 10px 10px black;
  ${screen3 ({
    fontSize : '30px',
  })}
`;

const DiceImage = styled.img`
  width: 90px;
  margin: 20px;
  ${screen2 ({
    width : '70px',
  })}
`;

function Board() {
  const specialIndices = [217, 187, 172, 157, 142, 126, 125, 124, 122, 121, 106, 91, 93, 94, 95, 96, 82, 67, 52, 22, 7, 8, 9, 39, 54, 69, 84, 100, 101, 102, 104, 105, 120, 135, 133, 132, 131, 130, 144, 159, 174, 204, 219, 218, 17, 18, 19, 20, 35, 50, 65, 64, 63, 62, 47, 32, 26, 27, 28, 29, 44, 59, 74, 73, 72, 71, 56, 41, 152, 153, 154, 155, 170, 185, 200, 199, 198, 197, 182, 167, 161, 162, 163, 164, 179, 194, 209, 208, 207, 206, 191, 176];
  const redIndices = [1, 2, 3, 4, 5, 6, 21, 36, 51, 66, 81, 80, 79, 78, 77, 76, 61, 46, 31, 16, 107, 108, 109, 110, 111, 112, 33 , 34, 49, 48];
  const blueIndices = [10, 11, 12, 13, 14, 15, 30, 45, 60, 75, 90, 25, 40, 55, 70, 85, 86, 87, 88, 89, 23, 38, 53, 68, 83, 98, 42, 43, 57, 58];
  const yellowIndices = [145, 146, 147, 148, 149, 150, 165, 180, 195, 210, 225, 224, 223, 222, 221, 220, 205, 190, 175, 160, 119, 118, 117, 116, 115, 114, 177, 178, 192, 193];
  const greenIndices = [136, 137, 138, 139, 140, 141, 156, 171, 186, 201, 216, 215, 214, 213, 212, 211, 196, 181, 166, 151, 203, 188, 173, 158, 143, 128, 168, 169, 183, 184];

  const initialPositions = {
    red: [17, 62, 65, 20],
    blue: [26, 71, 74, 29],
    yellow: [161, 206, 209, 164],
    green: [152, 197, 200, 155]
  };

  const playerPaths = {
    red: [92, 93, 94, 95, 96, 82, 67, 52, 37, 22, 7, 8, 9, 24, 39, 54, 69, 84, 100, 101, 102, 103, 104, 105, 120, 135, 134, 133, 132, 131, 130, 144, 159, 174, 189, 204, 219, 218, 217, 202, 187, 172, 157, 142, 126, 125, 124, 123, 122, 121, 106, 107, 108, 109, 110, 111, 112],
    blue: [24, 39, 54, 69, 84, 100, 101, 102, 103, 104, 105, 120, 135, 134, 133, 132, 131, 130, 144, 159, 174, 189, 204, 219, 218, 217, 202, 187, 172, 157, 142, 126, 125, 124, 123, 122, 121, 106, 91, 92, 93, 94, 95, 96, 82, 67, 52, 37, 22, 7, 8, 23, 38, 53, 68, 83, 98],
    yellow: [134, 133, 132, 131, 130, 144, 159, 174, 189, 204, 219, 218, 217, 202, 187, 172, 157, 142, 126, 125, 124, 123, 122, 121, 106, 91, 92, 93, 94, 95, 96, 82, 67, 52, 37, 22, 7, 8, 9, 24, 39, 54, 69, 84, 100, 101, 102, 103, 104, 105, 120, 119, 118, 117, 116, 115, 114],
    green: [202, 187, 172, 157, 142, 126, 125, 124, 123, 122, 121, 106, 91, 92, 93, 94, 95, 96, 82, 67, 52, 37, 22, 7, 8, 9, 24, 39, 54, 69, 84, 100, 101, 102, 103,  104, 105, 120, 135, 134, 133, 132, 131, 130, 144, 159, 174, 189, 204, 219, 218, 203, 188, 173, 158, 143, 128]
  };

  const {
    currDice,
    tempCurrDice,
    currentPlayer,
    playerPositions,
    currentPlayerIndex,
    playerOrder,
    rankings,
    winners,
    setCurrDice,
    setTempCurrDice,
    setCurrentPlayer,
    setPlayerPositions,
    setCurrentPlayerIndex,
    setPlayerOrder,
    setRankings,
    setWinners,
    restartGame,
  } = useGame();

  const isPlayerInHome = (color, pieceIndex) => {
    return playerPositions[color][pieceIndex] === initialPositions[color][pieceIndex];
  }

  const [isRolling, setIsRolling] = useState(false);
  const [diceImage, setDiceImage] = useState(Dice1);

  const diceImages = {
    1: Dice1,
    2: Dice2,
    3: Dice3,
    4: Dice4,
    5: Dice5,
    6: Dice6
  };

  useEffect(() => {
    const savedGameState = localStorage.getItem('ludoGameState');
    if (savedGameState) {
      try {
        const gameState = JSON.parse(savedGameState);
        setCurrDice(gameState.currDice);
        setTempCurrDice(gameState.tempCurrDice);
        setCurrentPlayer(gameState.currentPlayer);
        setCurrentPlayerIndex(gameState.currentPlayerIndex);
        setPlayerPositions(gameState.playerPositions);
        setPlayerOrder(gameState.playerOrder);
        setRankings(new Set(gameState.rankings));
        setWinners(new Set(gameState.winners));
      } catch (error) {
        console.error("Failed to parse game state:", error);
        localStorage.removeItem('ludoGameState');
      }
    }
  }, []);

  const saveGameState = () => {
    const gameState = {
      currDice,
      tempCurrDice,
      currentPlayer,
      currentPlayerIndex,
      playerPositions,
      playerOrder,
      rankings: Array.from(rankings),
      winners: Array.from(winners)
    };
    localStorage.setItem('ludoGameState', JSON.stringify(gameState));
  };

  const rollDice = () => {
    saveGameState();
    if (winners.has(currentPlayer)) {
      const players = ['red', 'blue', 'yellow', 'green'];
      const nextPlayerIndex = (players.indexOf(currentPlayer) + 1) % players.length;
      setCurrentPlayer(players[nextPlayerIndex]);
      return;
    }

    setIsRolling(true);

    setTimeout(() => {
      const diceRolled = Math.floor(Math.random() * 6) + 1;
      setDiceImage(diceImages[diceRolled]);
      setCurrDice(diceRolled);
      setTempCurrDice(diceRolled);
      setIsRolling(false);

      const allPiecesInHome = playerPositions[currentPlayer].every((pos, idx) => 
        pos === initialPositions[currentPlayer][idx]
      );

      if (allPiecesInHome && diceRolled !== 6) {
        const players = ['red', 'blue', 'yellow', 'green'];
        const nextPlayerIndex = (players.indexOf(currentPlayer) + 1) % players.length;
        setCurrentPlayer(players[nextPlayerIndex]);
        setCurrDice(0);
        return;
      }
    }, 1500);
 saveGameState();
  };

  useEffect(() => {
    setDiceImage(Dice1);
  }, []);

  const safePositions = [202, 123, 92, 37, 24, 103, 134, 189];

  const movePiece = (pieceIndex) => {
    saveGameState();
    setPlayerPositions(prevPositions => {
      const newPositions = { ...prevPositions };
      const currentPath = playerPaths[currentPlayer];
      
      let newPosition;
      if (currDice === 6 && isPlayerInHome(currentPlayer, pieceIndex)) {
        newPosition = currentPath[0];
      } else if (!isPlayerInHome(currentPlayer, pieceIndex)) {
        const currentPos = newPositions[currentPlayer][pieceIndex];
        const currentIndex = currentPath.indexOf(currentPos);
        const newIndex = currentIndex + currDice;

        if (newIndex < currentPath.length) {
          newPosition = currentPath[newIndex];
        } else {
          newPosition = null;
        }
      }

      if (newPosition) {
        const isSafePosition = safePositions.includes(newPosition);

        Object.keys(newPositions).forEach(color => {
          if (color !== currentPlayer) {
            newPositions[color] = newPositions[color].map(pos => {
              if (pos === newPosition && !isSafePosition) {
                return initialPositions[color][newPositions[color].indexOf(pos)];
              }
              return pos;
            });
          }
        });

        newPositions[currentPlayer] = newPositions[currentPlayer].map((pos, idx) => 
          idx === pieceIndex ? newPosition : pos
        );
      }
    
      if (currDice !== 6) {
        const players = ['red', 'blue', 'yellow', 'green'];
        const nextPlayerIndex = (players.indexOf(currentPlayer) + 1) % players.length;
        setCurrentPlayer(players[nextPlayerIndex]);
      }
      
      setCurrDice(0);
      
      checkForWin(newPositions);

      return newPositions;
    });
    saveGameState();
  };

  const navigate = useNavigate();

  const checkForWin = (positions) => {
    const currentPlayer = playerOrder[currentPlayerIndex];
    const winners = Object.keys(positions).filter(color => 
      positions[color].every(pos => playerPaths[color].includes(pos) && pos === playerPaths[color][playerPaths[color].length - 1])
    );

    if (winners.length > 0) {
      winners.forEach(winner => {
        setWinners(prevWinners => new Set(prevWinners).add(winner));
        setRankings(prevRankings => {
          const newRankings = new Set(prevRankings);
          newRankings.add(winner);
          return newRankings;
        });
      });

      const newOrder = playerOrder.filter(player => !winners.includes(player));
      setPlayerOrder(newOrder);
      if (newOrder.length > 0) {
        setCurrentPlayerIndex(0);
      }

      if (winners.length >= 3) {
        alert(`Game Over! Winners: ${winners.join(', ')}`);
        navigate('/winner', {
          state: { winners }
        });
      }
    } else {
      setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % playerOrder.length);
    }
  };

  const getMovablePieces = () => {
    if (currDice === 6) {
      return playerPositions[currentPlayer]
        .map((pos, index) => index);
    }
    
    return playerPositions[currentPlayer]
      .map((pos, index) => !isPlayerInHome(currentPlayer, index) ? index : -1)
      .filter(index => index !== -1);
  };

  const cells = Array.from({ length: 15 * 15 }, (_, index) => {
    const cellIndex = index + 1;
    const isSpecial = specialIndices.includes(cellIndex);
    const isSafe = safePositions.includes(cellIndex);
    const isRed = redIndices.includes(cellIndex);
    const isBlue = blueIndices.includes(cellIndex);
    const isYellow = yellowIndices.includes(cellIndex);
    const isGreen = greenIndices.includes(cellIndex);

    let backgroundColor = "grey";
    if (isRed) {
      backgroundColor = "red";
    } else if (isBlue) {
      backgroundColor = "blue";
    } else if (isYellow) {
      backgroundColor = "yellow";
    } else if (isGreen) {
      backgroundColor = "green";
    } else if (isSpecial) {
      backgroundColor = "white";
    }

    const piecesToRender = [];

    const pieceColor = {
      red: "#960000",
      blue: "#00007f",
 yellow: "#b2b200",
      green: "#004900",
    };
    
    Object.entries(playerPositions).forEach(([color, positions]) => {
      positions.forEach((position, pieceIndex) => {
        if (position === cellIndex) {
          piecesToRender.push(
            <Piece 
              key={`${color}-${pieceIndex}`} 
              style={{ 
                backgroundColor: pieceColor[color],
                opacity: color === currentPlayer ? 1 : 0.5,
                boxShadow: color === currentPlayer 
                  ? '0 0 20px 10px #09191F'
                  : 'none',
                color: "white",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }} 
            >
              {pieceIndex + 1}
            </Piece>
          );
        }
      });
    });

    
    return (
      <CellContainer
      key={index}
      style={{
        background: isSafe 
        ? "conic-gradient(rgba(255, 0, 0, 0.6) -45deg, rgba(0, 0, 255, 0.6)  45deg, rgba(255, 255, 0, 0.6) 135deg, rgba(0, 255, 0, 0.6) 225deg, rgba(255, 0, 0, 0.6) 325deg)" 
        : backgroundColor,
        border: "1.4px solid black",
      }}
      >
        {piecesToRender}
      </CellContainer>
    );
  });

  function debounce(func, timeout = 100) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const boardRef = useRef(null);

  useEffect(() => {
    const handleResize = new debounce((entries) => {
      for (let entry of entries) {
        // Handle the resize event here
        console.log('Resized:', entry.contentRect);
        // You can adjust styles or state based on the new size
      }
    });

    const resizeObserver = new ResizeObserver(handleResize);

    if (boardRef.current) {
      resizeObserver.observe(boardRef.current);
    } 

    return () => {
      if (boardRef.current) {
        resizeObserver.unobserve(boardRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <Wrapper ref={boardRef}>
        <Container>{cells}</Container>
        <ControlPanel>
          <Title>Online Ludo by Sahil</Title>
          <div style={{ fontSize: "25px" }}>Current Player: <strong>{currentPlayer.toUpperCase()}</strong></div>
          <div style={{ fontSize: "25px" }}>Dice Number: <strong>{tempCurrDice}</strong></div>
          <h2>Rankings: {Array.from(rankings).join(', ')}</h2>
          <DiceImage 
            src={isRolling ? DiceAnimate : diceImage} 
            alt="Dice"
          />
          <Button onClick={rollDice} disabled={currDice !== 0}>
            {winners.has(currentPlayer) ? "Skip move" : "Roll Dice"}
          </Button>

          {currDice > 0 && (
            <PieceControlPanel>
              {getMovablePieces().map((pieceIndex) => (
                <Button
                  key={pieceIndex}
                  onClick={() => movePiece(pieceIndex)}
                >
                  Move Piece {pieceIndex + 1}
                </Button>
              ))}
            </PieceControlPanel>
          )}
          <Button onClick={restartGame} style={{ marginTop: '20px' }}>
            Restart Game
          </Button>
        </ControlPanel>
    </Wrapper>
  );
}

export default Board;