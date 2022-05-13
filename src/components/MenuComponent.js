import React from "react";
import "./css/MenuComponent.css";
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
        <button className="hide-on-ld menu-button" onClick={openMenuPause}>
          Menu
        </button>
      </div>
      <div
        className={
          isMenuOpen ? "game-control-buttons visible" : "game-control-buttons"
        }
      >
        <div className="menu-card">
          <button onClick={resetGame}>Restart</button>
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
