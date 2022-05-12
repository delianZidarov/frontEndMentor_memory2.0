import React from "react";
import { useEffect } from "react";
import Token from "./Token.js";

function GameBoard({ state, selectFirstGuess, selectSecondGuess }) {
  return (
    <div className={`gameboard ${state.size === 4 ? "four" : "six"}`}>
      {state.board.map((icon, i) => {
        return (
          <Token
            state={state}
            selectFirstGuess={selectFirstGuess}
            selectSecondGuess={selectSecondGuess}
            icon={icon}
            tokenId={i}
            key={`token${i}`}
          />
        );
      })}
    </div>
  );
}

export default GameBoard;
