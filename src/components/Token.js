import React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/Token.css";
function Token({ icon, tokenId, state, selectFirstGuess, selectSecondGuess }) {
  const [canBeClicked, setCanBeClicked] = useState(true);
  const [tokenClass, setTokenClass] = useState(
    `game-token ${state.size === 6 ? "small" : ""}`
  );

  function onTokenClick(event) {
    if (parseInt(event.currentTarget.id) === tokenId) {
      if (state.firstGuess === null) {
        selectFirstGuess(parseInt(tokenId));
      }
      if (state.firstGuess !== null && state.secondGuess === null) {
        selectSecondGuess(parseInt(tokenId));
      }
    }
  }

  useEffect(() => {
    if (
      parseInt(tokenId) === state.firstGuess ||
      parseInt(tokenId) === state.secondGuess
    ) {
      setTokenClass(tokenClass + " active");
      setCanBeClicked(false);
    } else if (
      (state.matches[parseInt(tokenId)] !== 1 &&
        parseInt(tokenId) !== state.firstGuess) ||
      (state.matches[parseInt(tokenId)] !== 1 &&
        parseInt(tokenId) !== state.secondGuess)
    ) {
      setTokenClass(`game-token ${state.size === 6 ? "small" : ""}`);
      setCanBeClicked(true);
    }
  }, [state.firstGuess, state.secondGuess, state.board]);

  useEffect(() => {
    if (state.matches[parseInt(tokenId)] === 1) {
      setTokenClass(tokenClass + " matched");
      setCanBeClicked(false);
    }
  }, [state.matches]);
  // Testing to see if this solves visibility behavior
  useEffect(() => {
    if (state.setupScreenOpen) {
      setTokenClass(`game-token ${state.size === 6 ? "small" : ""}`);
    }
  }, [state.setupScreenOpen]);

  return (
    <button
      id={tokenId}
      className={tokenClass}
      onClick={canBeClicked ? onTokenClick : undefined}
    >
      {state.gameType === "icons" && <FontAwesomeIcon icon={icon} />}
      {state.gameType === "numbers" && <span>{icon}</span>}
    </button>
  );
}

export default Token;
