import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import gameContext from "../../gameContext";
import gameService from "../../services/gameService";
import socketService from "../../services/socketService";
import { Grid, FormGroup, FormControlLabel } from '@mui/material';
import RandomWord from './RandomWord';
import Tokens from './Tokens';
import "./css/index.css";
import "./css/App.css";
import "./css/DisplayHand.css";

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const RowContainer = styled.div`
  width: 100%;
  display: flex;
`;

interface ICellProps {
  borderTop?: boolean;
  borderRight?: boolean;
  borderLeft?: boolean;
  borderBottom?: boolean;
}

const Cell = styled.div<ICellProps>`
  width: 13em;
  height: 9em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  cursor: pointer;
  border-top: ${({ borderTop }) => borderTop && "3px solid #8e44ad"};
  border-left: ${({ borderLeft }) => borderLeft && "3px solid #8e44ad"};
  border-bottom: ${({ borderBottom }) => borderBottom && "3px solid #8e44ad"};
  border-right: ${({ borderRight }) => borderRight && "3px solid #8e44ad"};
  transition: all 270ms ease-in-out;

  &:hover {
    background-color: #8d44ad28;
  }
`;

const X = styled.span`
  font-size: 100px;
  color: #8e44ad;
  &::after {
    content: "X";
  }
`;

const O = styled.span`
  font-size: 100px;
  color: #8e44ad;
  &::after {
    content: "O";
  }
`;

export function Game() {

  const {
    playerSymbol,
    setPlayerSymbol,
    setPlayerTurn,
    isPlayerTurn,
    setGameStarted,
    isGameStarted,
  } = useContext(gameContext);

  const [decks, setDecks] = useState([]);

  const handleGameUpdate = () => {
    if (socketService.socket)
      gameService.onGameUpdate(socketService.socket, (newMatrix) => {
        setPlayerTurn(true);
      });
  };

  const handleGameStart = () => {
    if (socketService.socket)
      gameService.onStartGame(socketService.socket, (options) => {
        setGameStarted(true);
        if (options.start) setPlayerTurn(true);
        else setPlayerTurn(false);
      });
      gameService.deckInformation(socketService.socket, (options) => {
        setGameStarted(true);
        if (options.start) setPlayerTurn(true);
        else setPlayerTurn(false);
      });
    };

  const handleGameWin = () => {
    if (socketService.socket)
      gameService.onGameWin(socketService.socket, (message) => {
        setPlayerTurn(false);
        alert(message);
      });
  };

  useEffect(() => {
    handleGameUpdate();
    handleGameStart();
    handleGameWin();
  }, []);

    const [cards, setCards] = useState(null);
    const [tokens, setTokens] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [displayedHand, setHand] = useState(cards?.getHand() || []);
    const [score, setScore] = useState(0);
    const [scoreCount, setScoreCount] = useState(0);

    useEffect(() => {
      const cardSetup = new RandomWord();
      cardSetup.setUpBoard([]);
      setCards(cardSetup)
      setHand(cardSetup.getHand());

      const tokenSetup = new Tokens();
      setTokens(tokenSetup);
    }, []);

    const select = (index: number) => {
      setSelectedCard(cards.getHand()[index]);
      cards.pickCardFromHand(index);
      setHand(cards.getHand());
    }

    const drawPoints = (pileNumber: number) => {
      const points = tokens.getPoints(pileNumber);
      setScoreCount(scoreCount + 1);
      setScore(score + points);
    }

    const firstHalfOfHand = displayedHand.slice(0, 4);
    const lastHalfOfHand = displayedHand.slice(4, displayedHand.length);

    const getCardIndex = (card: string) => {
      return displayedHand.findIndex(cd => cd === card);
    };

  return (
    <GameContainer className="main-container">
      {!isGameStarted && (
        <h2>Waiting for Other Player to Join to Start the Game!</h2>
      )}
      {isGameStarted && (
          <div className="App">
            <header className="App-header">
              <h2>
                Medium
              </h2>
                  <Grid className="stack" justifyContent="center" container direction="row">
                      <div className="stack-pieces">
                          <div onClick={() => drawPoints(1)} className="token first one-stacked"/>
                      </div>
                      <div className="stack-pieces">
                          <div onClick={() => drawPoints(2)} className="token second"/>
                      </div>
                      <div className="stack-pieces">
                          <div onClick={() => drawPoints(3)} className="token third three-stacked"/>
                      </div>
                      <div className="stack-pieces">
                          <p className="score-label">Score</p>
                          <p className="count">{score}</p>
                      </div>
                  </Grid>
                  <Grid className="container">
                      <p className="score">
                        Collected Tokens: {scoreCount}
                      </p>
                      <p>
                          Remaining in Deck: {cards?.getCurrentDeck().length || 0}
                      </p>
                  </Grid>
                  <Grid className="container">
                      <div onClick={() => drawPoints(1)} className="token first cursor">
                          <p className="token-text">I</p>
                          <p className="token-counter">{tokens?.getPileOne().length || 0} remaining</p>
                      </div>
                      <div onClick={() => drawPoints(2)} className="token second cursor">
                          <p className="token-text">II</p>
                          <p className="token-counter">{tokens?.getPileTwo().length || 0} remaining</p>
                      </div>
                      <div onClick={() => drawPoints(3)} className="token third cursor">
                          <p className="token-text">III</p>
                          <p className="token-counter">{tokens?.getPileThree().length || 0} remaining</p>
                      </div>
                  </Grid>
                  <p>Selected Card</p>
                  <div className="card">
                      <p className="text">{selectedCard}</p>
                  </div>
              {displayedHand.length !== 0 && (<>
                  <p>Your Hand</p>
                  <Grid className="container">
                      {firstHalfOfHand.map((card, i) => {
                          return (
                              <div key={i} onClick={() => select(getCardIndex(card))}>
                                  <div className="card cursor">
                                      <p className="text">{card}</p>
                                  </div>
                              </div>
                          );
                      })}
                  </Grid>
                  <Grid className="container">
                      {lastHalfOfHand.map((card, i) => {
                          return (
                              <div key={i} onClick={() => select(getCardIndex(card))}>
                                  <div className="card cursor">
                                      <p className="text">{card}</p>
                                  </div>
                              </div>
                          );
                      })}
                  </Grid>
              </>)}
            </header>
          </div>
      )}
    </GameContainer>
  );
}
