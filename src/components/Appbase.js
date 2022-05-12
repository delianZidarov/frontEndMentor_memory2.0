import React from "react";
import { useReducer, useEffect, useState, useRef } from "react";
import OutsideControlTest from "./OutsideControlTest.js";
import SetupScreen from "./SetupScreen.js";
import MenuComponent from "./MenuComponent.js";
import GameBoard from "./GameBoard.js";
import PlayerInformationDisplay from "./PlayerInformationDisplay.js";
import Logo from "./Logo.js";
import {
  faAward,
  faAnchor,
  faBiohazard,
  faBowlRice,
  faBridgeWater,
  faBug,
  faBurger,
  faChessQueen,
  faCartShopping,
  faCookieBite,
  faCouch,
  faCrow,
  faGift,
  faGhost,
  faHippo,
  faHeart,
  faMask,
  faOtter,
} from "@fortawesome/free-solid-svg-icons";
import GameOverScreen from "./GameOverScreen.js";
const ACTIONS = {
  OPEN_SETUP_SCREEN: "open_setup_screen",
  CLOSE_SETUP_SCREEN: "close_setup_screen",
  OPEN_MENU: "open_menu",
  CLOSE_MENU: "close_menu",
  START_TIMER: "start_timer",
  PAUSE_TIMER: "pause_timer",
  RESET_TIMER: "reset_timer",
  INCREMENT_TIMER: "increment_timer",
  SELECT_FIRST_GUESS: "select_first_guess",
  SELECT_SECOND_GUESS: "select_second_guess",
  ADD_TO_MATCHES: "add_to_matches",
  GENERATE_AND_SET_NEW_BOARD: "generate_and_set_new_board",
  SET_PLAYER_NUMBER: "set_player_number",
  SET_GAME_TYPE: "set_game_type",
  SET_BOARD_SIZE: "set_board_size",
  UPDATE_PLAYERS_OBJECT: "update_player_object",
  RESET_CURRENT_PLAYER: "reset_current_player",
  INCREMENT_CURRENT_PLAYER: "increment_current_player",
  RESET_MOVES_LEFT: "reset_moves_left",
  DECREMENT_MOVES_LEFT: "decrement_moves_left",
  CLEAR_BOARD: "clear_board",
  RESET_GUESSES: "reset_guesses",
  START_A_NEW_GAME: "start_a_new_game",
  RESET_GAME: "reset_game",
  GET_TO_SETUP: "get_to_setup",
  OPEN_MENU_PAUSE: "open_menu_pause",
  CLOSE_MENU_ACTIVATE: "close_menu_activate",
  HANDLE_SCORE: "handle_score",
  HANDLE_FAIL_TO_SCORE: "handle_fail_to_score",
};
const defaultState = {
  setupScreenOpen: false,
  menuOpen: false,
  timer: 0,
  firstGuess: null,
  secondGuess: null,
  matches: {},
  players: { 1: { name: "Player 1", score: 0, moves: 0 } },
  gameType: "numbers",
  size: 4,
  numberOfPlayers: 1,
  currentPlayer: 1,
  movesLeft: 8,
  board: generateBoard("numbers", 4),
  timerActive: false,
  timerPaused: true,
};
const iconArray = [
  faAward,
  faAnchor,
  faBiohazard,
  faBowlRice,
  faBridgeWater,
  faBug,
  faBurger,
  faChessQueen,
  faCartShopping,
  faCookieBite,
  faCouch,
  faCrow,
  faGift,
  faGhost,
  faHippo,
  faHeart,
  faMask,
  faOtter,
];
function reducer(state, action) {
  switch (action.type) {
    case "open_setup_screen":
      return { ...state, setupScreenOpen: true };
    case "close_setup_screen":
      return { ...state, setupScreenOpen: false };
    case "open_menu":
      return { ...state, menuOpen: true };
    case "close_menu":
      return { ...state, menuOpen: false };
    case "select_first_guess":
      return { ...state, firstGuess: action.payload };
    case "select_second_guess":
      return { ...state, secondGuess: action.payload };
    case "add_to_matches":
      return { ...state, matches: { ...state.matches, [action.payload]: 1 } };
    case "set_player_number":
      return { ...state, numberOfPlayers: action.payload };
    case "set_game_type":
      return { ...state, gameType: action.payload };
    case "set_board_size":
      return { ...state, size: parseInt(action.payload) };
    case "reset_current_player":
      return { ...state, currentPlayer: 1 };
    case "increment_current_player":
      let nextPlayer;
      if (state.currentPlayer + 1 <= state.numberOfPlayers) {
        nextPlayer = state.currentPlayer + 1;
      } else {
        nextPlayer = 1;
      }
      return { ...state, currentPlayer: nextPlayer };
    case "reset_moves_left":
      return { ...state, movesLeft: state.size ** 2 / 2 };
    case "decrement_moves_left":
      return { ...state, movesLeft: state.movesLeft - 1 };
    case "update_players_object":
      return { ...state, players: action.payload };
    case "generate_and_set_new_board":
      return { ...state, board: generateBoard(state.gameType, state.size) };
    case "start_timer":
      return { ...state, timerActive: true, timerPaused: false };
    case "pause_timer":
      return { ...state, timerActive: false, timerPaused: true };
    case "reset_timer":
      return { ...state, timer: 0, timerActive: false, timerPaused: true };
    case "increment_timer":
      return { ...state, timer: state.timer + 1 };
    case "clear_board":
      return { ...state, board: [] };
    case "reset_guesses":
      return { ...state, firstGuess: null, secondGuess: null };
    case "start_a_new_game":
      return {
        setupScreenOpen: false,
        menuOpen: false,
        timer: 0,
        firstGuess: null,
        secondGuess: null,
        matches: {},
        players: generatePlayersObject(action.payload.numberOfPlayers),
        gameType: action.payload.gameType,
        size: parseInt(action.payload.size),
        numberOfPlayers: parseInt(action.payload.numberOfPlayers),
        currentPlayer: 1,
        movesLeft: action.payload.size ** 2 / 2,
        board: generateBoard(
          action.payload.gameType,
          parseInt(action.payload.size)
        ),
        timerActive: false,
        timerPaused: true,
      };
    case "reset_game":
      return {
        ...state,
        setupScreenOpen: false,
        menuOpen: false,
        timer: 0,
        firstGuess: null,
        secondGuess: null,
        matches: {},
        players: generatePlayersObject(state.numberOfPlayers),
        currentPlayer: 1,
        movesLeft: state.size ** 2 / 2,
        board: generateBoard(state.gameType, state.size),
        timerActive: false,
        timerPaused: true,
      };
    case "get_to_setup":
      return { ...state, menuOpen: false, setupScreenOpen: true };
    case "open_menu_pause":
      return {
        ...state,
        menuOpen: true,
        timerActive: false,
        timerPaused: true,
      };
    case "close_menu_activate":
      return {
        ...state,
        menuOpen: false,
        timerActive: true,
        timerPaused: false,
      };
    case "handle_score":
      let updatedPlayers = { ...state.players };
      updatedPlayers[state.currentPlayer].score = action.payload.score + 1;
      updatedPlayers[state.currentPlayer].moves = action.payload.moves + 1;
      return {
        ...state,
        currentPlayer: getNextPlayer(
          state.currentPlayer,
          state.numberOfPlayers
        ),
        players: updatedPlayers,
        movesLeft: state.movesLeft - 1,
        firstGuess: null,
        secondGuess: null,
        matches: {
          ...state.matches,
          [state.firstGuess]: 1,
          [state.secondGuess]: 1,
        },
      };
    case "handle_fail_to_score":
      let fUpdatedPlayers = { ...state.players };
      fUpdatedPlayers[state.currentPlayer].moves = action.payload.moves + 1;
      return {
        ...state,
        currentPlayer: getNextPlayer(
          state.currentPlayer,
          state.numberOfPlayers
        ),
        players: fUpdatedPlayers,
        firstGuess: null,
        secondGuess: null,
      };
  }
}

function generateBoard(gameType, size) {
  let smallDict = {};
  let halfBoard;
  let tokensToMapTo;
  if (size === 4) {
    if (gameType === "numbers") {
      halfBoard = generateUniqueList(8, 8, smallDict);
      tokensToMapTo = [...halfBoard, ...halfBoard];
      return randomizeList(tokensToMapTo);
    }
    if (gameType === "icons") {
      halfBoard = generateUniqueList(8, iconArray.length, smallDict).map(
        (element) => iconArray[element]
      );
      tokensToMapTo = [...halfBoard, ...halfBoard];
      return randomizeList(tokensToMapTo);
    }
  }
  if (size === 6) {
    if (gameType === "numbers") {
      halfBoard = generateUniqueList(18, 18, smallDict);
      tokensToMapTo = [...halfBoard, ...halfBoard];
      return randomizeList(tokensToMapTo);
    }
    if (gameType === "icons") {
      halfBoard = generateUniqueList(18, 18, smallDict).map(
        (element) => iconArray[element]
      );
      tokensToMapTo = [...halfBoard, ...halfBoard];
      return randomizeList(tokensToMapTo);
    }
  }
}
function randomizeList(array) {
  let dictionaryIndex = {};
  const indexSelection = generateUniqueList(
    array.length,
    array.length,
    dictionaryIndex
  );
  return indexSelection.map((index) => array[index]);
}
function generateUniqueList(size, range, dictionary) {
  let randomNumbers = [];
  while (randomNumbers.length < size) {
    let randomNumber = Math.floor(Math.random() * range);
    if (dictionary[randomNumber] == undefined) {
      randomNumbers.push(randomNumber);
      dictionary[randomNumber] = 1;
    }
  }
  return randomNumbers;
}
function generatePlayersObject(numberOfPlayers) {
  let players = {};
  for (let i = 1; i <= numberOfPlayers; i++) {
    players[i] = { name: `Player ${i}`, score: 0, moves: 0 };
  }
  return players;
}
function getNextPlayer(currentPlayer, numberOfPlayers) {
  let nextPlayer;
  if (currentPlayer + 1 <= numberOfPlayers) {
    nextPlayer = currentPlayer + 1;
  } else {
    nextPlayer = 1;
  }
  return nextPlayer;
}
function Appbase() {
  const [state, dispatch] = useReducer(reducer, defaultState);
  //DISPATCH FUNCTIONS
  function openSetupScreen() {
    dispatch({ type: ACTIONS.OPEN_SETUP_SCREEN });
  }
  function closeSetupScreen() {
    dispatch({ type: ACTIONS.CLOSE_SETUP_SCREEN });
  }
  //   function openMenu() {
  //     dispatch({ type: ACTIONS.OPEN_MENU });
  //   }
  //   function closeMenu() {
  //     dispatch({ type: ACTIONS.CLOSE_MENU });
  //   }
  function selectFirstGuess(payload) {
    dispatch({ type: ACTIONS.SELECT_FIRST_GUESS, payload });
  }
  function selectSecondGuess(payload) {
    dispatch({ type: ACTIONS.SELECT_SECOND_GUESS, payload });
  }
  //   function addToMatches(payload) {
  //     dispatch({ type: ACTIONS.ADD_TO_MATCHES, payload });
  //   }
  //   function setPlayerNumber(payload) {
  //     dispatch({ type: ACTIONS, payload });
  //   }
  //   function setGameType(payload) {
  //     dispatch({ type: ACTIONS.SET_GAME_TYPE, payload });
  //   }
  //   function setBoardSize(payload) {
  //     dispatch({ type: ACTIONS.SET_BOARD_SIZE, payload });
  //   }
  //   function resetCurrentPlayer() {
  //     dispatch({ type: ACTIONS.RESET_CURRENT_PLAYER });
  //   }
  //   function incrementCurrentPlayer() {
  //     dispatch({ type: ACTIONS.INCREMENT_CURRENT_PLAYER });
  //   }
  //   function decrementMovesLeft() {
  //     dispatch({ type: ACTIONS.DECREMENT_MOVES_LEFT });
  //   }
  //   function resetMovesLeft() {
  //     dispatch({ type: ACTIONS.RESET_MOVES_LEFT });
  //   }
  //   function updatePlayersObject(payload) {
  //     dispatch({ type: ACTIONS, payload });
  //   }
  //   function generateAndSetNewBoard() {
  //     dispatch({ type: ACTIONS.GENERATE_AND_SET_NEW_BOARD });
  //   }
  //   function clearBoard() {
  //     dispatch({ type: ACTIONS.CLEAR_BOARD });
  //   }
  function startTimer() {
    dispatch({ type: ACTIONS.START_TIMER });
  }
  function pauseTimer() {
    dispatch({ type: ACTIONS.PAUSE_TIMER });
  }
  function resetTimer() {
    dispatch({ type: ACTIONS.RESET_TIMER });
  }
  function incrementTimer() {
    dispatch({ type: ACTIONS.INCREMENT_TIMER });
  }
  //   function resetGuesses() {
  //     dispatch({ type: ACTIONS.RESET_GUESSES });
  //   }

  //COMPOUND DISPATCHES FUNCTIONS
  function startANewGame(payload) {
    dispatch({ type: ACTIONS.START_A_NEW_GAME, payload });
  }
  function resetGame() {
    dispatch({ type: ACTIONS.RESET_GAME });
  }
  function getToSetup() {
    dispatch({ type: ACTIONS.GET_TO_SETUP });
  }
  function openMenuPause() {
    dispatch({ type: ACTIONS.OPEN_MENU_PAUSE });
  }
  function closeMenuActivate() {
    dispatch({ type: ACTIONS.CLOSE_MENU_ACTIVATE });
  }
  function handleScore(payload) {
    dispatch({ type: ACTIONS.HANDLE_SCORE, payload });
  }
  function handleFailToScore(payload) {
    dispatch({ type: ACTIONS.HANDLE_FAIL_TO_SCORE, payload });
  }
  //   console.log("TESTER", state.players[state.currentPlayer]);
  //   const [isActive, setIsActive] = useState(false);
  //   const [isPaused, setIsPaused] = useState(true);
  //   const [time, setTime] = useState(0);
  //   function triggerStart() {
  //     setIsActive(true);
  //     setIsPaused(false);
  //   }
  //   function triggerPause() {
  //     setIsPaused(true);
  //   }
  //   function reset() {
  //     setIsActive(false);
  //     setIsPaused(true);
  //     setTime(0);
  //   }
  //   useEffect(() => {
  //     let timerId;
  //     if (isActive && isPaused === false) {
  //       timerId = setInterval(() => {
  //         setTime((time) => time + 1);
  //       }, 1000);
  //     } else {
  //       clearInterval(timerId);
  //     }
  //     return () => {
  //       clearInterval(timerId);
  //     };
  //   }, [isActive, isPaused]);
  console.log("BOARD", state);
  //TIMER
  useEffect(() => {
    let timerId;
    if (state.timerActive && state.timerPaused === false) {
      timerId = setInterval(() => {
        incrementTimer();
      }, 1000);
    } else {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [state.timerActive, state.timerPaused]);
  //TIMER TOKEN CLICK
  useEffect(() => {
    if (state.firstGuess !== null && state.timerActive === false) {
      startTimer();
    }
  }, [state.firstGuess]);
  //CHECK FOR SCORE AND ADVANCE GAME
  useEffect(() => {
    if (state.firstGuess !== null && state.secondGuess !== null) {
      if (state.board[state.firstGuess] === state.board[state.secondGuess]) {
        handleScore({
          score: state.players[state.currentPlayer].score,
          moves: state.players[state.currentPlayer].moves,
        });
      } else {
        handleFailToScore({ moves: state.players[state.currentPlayer].moves });
      }
    }
  }, [state.secondGuess]);
  //GAME OVER
  useEffect(() => {
    console.log("i triggered");
    if (state.movesLeft === 0) {
      pauseTimer();
    }
  }, [state.movesLeft]);
  return (
    <div>
      <header>
        <Logo />
        <MenuComponent
          getToSetup={getToSetup}
          resetGame={resetGame}
          openMenuPause={openMenuPause}
          closeMenuActivate={closeMenuActivate}
          isMenuOpen={state.menuOpen}
        />
      </header>
      <main>
        {/* <p>TIME:</p>
        <p>{state.timer}</p>
        <OutsideControlTest
          startTimer={startTimer}
          pauseTimer={pauseTimer}
          resetTimer={resetTimer}
        />
        <button onClick={openSetupScreen}>OPEN_SETUP_SCREEN</button>
        <button onClick={closeSetupScreen}>CLose setup</button>
        <button onClick={resetGame}>Reset GAme</button> */}
        <GameBoard
          state={state}
          selectFirstGuess={selectFirstGuess}
          selectSecondGuess={selectSecondGuess}
        />
        <PlayerInformationDisplay state={state} />

        {state.setupScreenOpen && <SetupScreen startANewGame={startANewGame} />}
        {state.movesLeft === 0 && (
          <GameOverScreen
            resetGame={resetGame}
            getToSetup={getToSetup}
            state={state}
          />
        )}
      </main>
    </div>
  );
}

export default Appbase;
