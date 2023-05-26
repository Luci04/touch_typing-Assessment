import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Word from "./components/Word/Word";
import Timer from "./components/Word/Timer/Timer";
import Text from "./TypingText";

const getCloud = () => Text.split(" ");

function App() {
  const [userInput, setUserInput] = useState("");

  const [isFinished, setIsFinished] = useState(false);

  const cloud = useRef(getCloud());

  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState(
    Array(cloud.current.length).fill(null)
  );

  const [startCount, setStartCount] = useState(false);
  // const [accuracy, setAccuracy] = useState(0);

  const processInput = (value) => {
    if (!startCount) {
      setStartCount(true);
    }

    if (value.endsWith(" ")) {
      //User is End of a Word
      setActiveWordIndex((index) => index + 1);
      setUserInput("");

      const word = value.trim();

      //Correct Word
      setCorrectWordArray((data) => {
        const newResult = [...data];

        newResult[activeWordIndex] = word === cloud.current[activeWordIndex];
        // setAccuracy(accuracy + 1);

        return newResult;
      });
    } else {
      setUserInput(value);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Typing Test</h1>
        <Timer
          setIsFinished={setIsFinished}
          startCount={startCount}
          correctWords={correctWordArray.filter((val) => val === true).length}
        />

        {!isFinished && (
          <p className="text-container">
            {cloud.current.map((word, index) => {
              return (
                <Word
                  isFinished={isFinished}
                  shown={
                    index <= activeWordIndex + 5 && index >= activeWordIndex - 5
                  }
                  text={word}
                  active={index === activeWordIndex}
                  key={index}
                  correct={correctWordArray[index]}
                />
              );
            })}
          </p>
        )}

        <input
          className="input-box"
          placeholder="Start Typing..."
          disabled={isFinished}
          type="text"
          value={userInput}
          onChange={(e) => processInput(e.target.value)}
        />

        {isFinished && (
          <p>
            Accuracy :{" "}
            {(correctWordArray.filter((val) => val === true).length /
              activeWordIndex) *
              100}{" "}
            %
          </p>
        )}
      </div>
    </>
  );
}

export default App;
