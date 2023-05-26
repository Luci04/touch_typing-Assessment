import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./Timer.css";

function Timer({ startCount, correctWords, setIsFinished }) {
  const [timeElapsed, setTimeElapsed] = useState(0);

  const minutes = timeElapsed / 60;

  useEffect(() => {}, [startCount]);

  return (
    <CountdownCircleTimer
      isPlaying={startCount}
      duration={300}
      colors={[
        "#48f542",
        "#f5e942",
        "#f5b042",
        "#f56342",
        "#db3b3b",
        "#ff0000",
      ]}
      colorsTime={[300, 250, 200, 150, 100, 20]}
      onUpdate={() => setTimeElapsed(timeElapsed + 1)}
      onComplete={() => {
        setIsFinished(true);
      }}
    >
      {({ remainingTime }) => (
        <div className="measurement-container">
          <p>Time Remaining: {remainingTime}</p>
          <p>Speed : {(correctWords / minutes || 0).toFixed(2)} WPM</p>
        </div>
      )}
    </CountdownCircleTimer>
  );
}

export default Timer;
