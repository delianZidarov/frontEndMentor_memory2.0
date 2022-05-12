import React from "react";

function PlayerInformationDisplay({ state }) {
  const windowSize = window.innerWidth;

  return (
    <div className="player-information-container">
      {state.numberOfPlayers === 1 && (
        <>
          <div>
            <h2>Time</h2>
            <p>{state.timer}</p>
          </div>
          <div>
            <h2>Moves</h2>
            <p>{state.players[state.currentPlayer].moves}</p>
          </div>
        </>
      )}
      {state.numberOfPlayers > 1 &&
        [...state.players].map((player, index) => {
          <div key={index}>
            <h2>
              {windowSize < 450
                ? player.name.slice(0, 1) + player.name.slice(-1)
                : player.name}
            </h2>
            <p>{player.score}</p>
          </div>;
        })}
    </div>
  );
}

export default PlayerInformationDisplay;
