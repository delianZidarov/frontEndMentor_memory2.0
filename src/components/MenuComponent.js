import React from "react";
import "./css/MenuComponent.css";
import { useEffect } from "react";
function MenuComponent({
  getToSetup,
  resetGame,
  openMenuPause,
  closeMenuActivate,
  isMenuOpen,
}) {
  return (
    <div>
      <div>
        <button className="hide-on-ld" onClick={openMenuPause}>
          Menu
        </button>
      </div>
      <div
        className={
          isMenuOpen ? "game-control-buttons visible" : "game-control-buttons"
        }
      >
        <div>
          <button onClick={resetGame}>Restart Game</button>
          <button onClick={getToSetup}>New Game</button>
          <button className="hide-on-ld" onClick={closeMenuActivate}>
            Resume Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuComponent;
