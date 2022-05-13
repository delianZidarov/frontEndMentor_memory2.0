import React from "react";
import "./css/GameOverScreen.css";
function GameOverScreen({ state, resetGame, getToSetup }) {
  let sortPlayersArray = Object.keys(state.players).map(
    (playerKey) => state.players[playerKey]
  );
  sortPlayersArray.sort((a, b) => b.score - a.score);
  let isThereATie;
  let maxScore;
  if (state.numberOfPlayers > 1) {
    isThereATie =
      sortPlayersArray[0].score === sortPlayersArray[1].score ? true : false;
    maxScore = sortPlayersArray[0].score;
  }
  return (
    <div className="game-over-popup">
      <div className="game-over-card">
        <div className="game-over-card-tittle">
          {state.numberOfPlayers === 1 && (
            <>
              <h2>You did it!</h2>
              <p>Game over! Here's how you got on...</p>
            </>
          )}
          {state.numberOfPlayers > 1 && (
            <>
              <h2>
                {isThereATie
                  ? "It's a tie!"
                  : `${sortPlayersArray[0].name} Wins!`}
              </h2>
              <p>Game over! Here are the results...</p>
            </>
          )}
        </div>
        <div className="game-over-player-info">
          {state.numberOfPlayers === 1 && (
            <>
              <div>
                <h3>Time Elapsed</h3>
                <p>{state.timer}</p>
              </div>
              <div>
                <h3>Moves Taken</h3>
                <p>{state.players[state.currentPlayer].moves} Moves</p>
              </div>
            </>
          )}
          {state.numberOfPlayers > 1 && (
            <>
              {sortPlayersArray.map((playerObject, i) => {
                return (
                  <div
                    key={`finalscore${i}`}
                    className={
                      playerObject.score === maxScore
                        ? "finalscore winner"
                        : "finalscore"
                    }
                  >
                    <h3>
                      {playerObject.name}{" "}
                      {playerObject.score === maxScore ? "(Winner)" : ""}
                    </h3>
                    <p>{playerObject.score} Pairs</p>
                  </div>
                );
              })}
            </>
          )}
        </div>
        <div className="game-over-button-container">
          <button onClick={resetGame}>Restart</button>
          <button onClick={getToSetup}>Setup New Game</button>
        </div>
      </div>
    </div>
  );
}

export default GameOverScreen;
