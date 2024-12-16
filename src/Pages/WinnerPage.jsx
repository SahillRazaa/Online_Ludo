import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGame } from '../GameContext'; 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  font-family: 'Arial', sans-serif;
`;

const Headings = styled.h1`
  font-size: 100px; 
  line-height: 0px;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 20px;
`;

const WinnerList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Winner = styled.div`
  font-size: 1.5rem;
  width: 30vw;
  text-align: center;
  font-weight: bold;
  margin: 15px 0;
  padding: 10px 20px;
  border-radius: 10px;
  color: ${props => props.color};
  background-color: black;
  box-shadow: 0px 0px 20px 3px ${props => props.color};
`;

const Button = styled.button`
  font-size: 1.5rem;
  padding: 10px 20px;
  border: none;
  margin-top : 20px;
  border-radius: 10px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
`;

const Congratulations = () => {
  const location = useLocation();
  const { winners } = location.state || { winners: [] };
  const { restartGame } = useGame();

  const navigate = useNavigate();

  const handleRestart = () => {
    restartGame(); 
    navigate('/'); 
  };

  return (
    <Container>
      <Headings>GAME OVER!!</Headings>
      <Title>Congratulations!</Title>
      <WinnerList>
        {winners.map((color, index) => (
          <Winner key={index} color={color}>
            {getOrdinalSuffix(index + 1)} Place: {color.charAt(0).toUpperCase() + color.slice(1)}
          </Winner>
        ))}
      </WinnerList>
      <Button onClick={handleRestart}>Restart Game</Button>
    </Container>
  );
};

const getOrdinalSuffix = (num) => {
  const suffixes = ["th", "st", "nd"];
  const value = num % 100;
  return num + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
};

export default Congratulations;