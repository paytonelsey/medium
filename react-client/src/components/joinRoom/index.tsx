import React, { useContext, useState } from "react";
import styled from "styled-components";
import gameContext from "../../gameContext";
import gameService from "../../services/gameService";
import socketService from "../../services/socketService";
import { Grid, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const JoinRoomContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2em;
`;

const RoomIdInput = styled.input`
  height: 30px;
  width: 20em;
  font-size: 17px;
  outline: none;
  border: 1px solid #8e44ad;
  border-radius: 3px;
  padding: 0 10px;
`;

const JoinButton = styled.button`
  outline: none;
  background-color: #8e44ad;
  color: #fff;
  font-size: 17px;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 4px 18px;
  transition: all 230ms ease-in-out;
  margin-top: 1em;
  cursor: pointer;

  &:hover {
    background-color: transparent;
    border: 2px solid #8e44ad;
    color: #8e44ad;
  }
`;

export function JoinRoom() {
  const [roomName, setRoomName] = useState("");
  const [isJoining, setJoining] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [areYouSure, setAreYouSure] = useState(false);
    const [message, setMessage] = useState("");

    const selectionsDefault = [null, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
    const [selections, setSelections] = useState(selectionsDefault);
    const selectDeck = (index: number) => {
      const select = selections;
      select[index] = !select[index];
      setSelections(select);
    }

    const getSelectedDecks = () => {
      const decks = selections.map((selection, i) => {
          if (selection) return i;
      }).filter(selection => selection !== undefined)
      return decks;
    }

  const { setInRoom, isInRoom } = useContext(gameContext);

  const handleRoomNameChange = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    setRoomName(value);
  };

  const joinRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    const decksInPlay = getSelectedDecks();
    if (decksInPlay.length === 0) {
        setMessage("Please select at least one deck");
        setShowMessage(true);
        return;
    } else if (decksInPlay.length > 4 && !areYouSure) {
        setMessage("That's a lot of decks... Are you sure?");
        setAreYouSure(true);
        setShowMessage(true);
        return;
    }

    const socket = socketService.socket;
    if (!roomName || roomName.trim() === "" || !socket) return;

    setJoining(true);

    const joined = await gameService
      .joinGameRoom(socket, roomName)
      .catch((err) => {
        alert(err);
      });

    await gameService.deckInformation(socket, decksInPlay);

    if (joined) setInRoom(true);

    setJoining(false);
  };

  return (
    <form onSubmit={joinRoom}>
      <JoinRoomContainer>
        <h4>Enter Room ID to Join the Game</h4>
              <h6>Pick Your Decks</h6>
              <Grid className="container checkboxes">
                  <FormGroup>
                    <FormControlLabel control={<Checkbox onClick={() => selectDeck(1)}/>} label="01" />
                    <FormControlLabel control={<Checkbox onClick={() => selectDeck(2)}/>} label="02" />
                    <FormControlLabel control={<Checkbox onClick={() => selectDeck(3)}/>} label="03" />
                    <FormControlLabel control={<Checkbox onClick={() => selectDeck(4)}/>} label="04" />
                    <FormControlLabel control={<Checkbox onClick={() => selectDeck(5)}/>} label="05" />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox onClick={() => selectDeck(6)}/>} label="06" />
                    <FormControlLabel control={<Checkbox onClick={() => selectDeck(7)}/>} label="07" />
                    <FormControlLabel control={<Checkbox onClick={() => selectDeck(8)}/>} label="08" />
                    <FormControlLabel control={<Checkbox onClick={() => selectDeck(9)}/>} label="09" />
                    <FormControlLabel control={<Checkbox onClick={() => selectDeck(10)}/>} label="10" />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={<Checkbox onClick={() => selectDeck(11)}/>} label="11" />
                    <FormControlLabel control={<Checkbox onClick={() => selectDeck(12)}/>} label="12" />
                    <FormControlLabel control={<Checkbox onClick={() => selectDeck(13)}/>} label="13" />
                    <FormControlLabel control={<Checkbox onClick={() => selectDeck(14)}/>} label="14" />
                    <FormControlLabel control={<Checkbox onClick={() => selectDeck(15)}/>} label="15" />
                </FormGroup>
              </Grid>
              <p className="warning">{showMessage ? message : ""}</p>
        <RoomIdInput
          placeholder="Room ID"
          value={roomName}
          onChange={handleRoomNameChange}
        />
        <JoinButton type="submit" disabled={isJoining}>
          {isJoining ? "Starting..." : "Start"}
        </JoinButton>
      </JoinRoomContainer>
    </form>
  );
}
