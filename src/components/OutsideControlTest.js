import React from "react";

function OutsideControlTest({ startTimer, resetTimer, pauseTimer }) {
  return (
    <div>
      <button onClick={startTimer}>START</button>
      <button onClick={resetTimer}>RESET</button>
      <button onClick={pauseTimer}>PAUSE</button>
    </div>
  );
}

export default OutsideControlTest;
