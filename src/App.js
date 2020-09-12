import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { wordsList } from "./wordList";

function App() {
  const [words, setWords] = useState(wordsList);
  const [word, setWord] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(5);
  const intervalRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    intervalRef.current = setInterval(() => {
      setTimer((prevState) => prevState - 1);
    }, 1000);
    showWord(words);
  }, []);

  useGameOver(timer, setWord);
  const startGame = () => {
    setInput("")
    inputRef.current.focus();
    intervalRef.current = setInterval(() => {
      setTimer((prevState) => prevState - 1);
    }, 1000);
    showWord(words);
    setScore(0)
    setTimer(5);
    const input = document.querySelector("input");
    input.disabled = "";
    input.focus();
  };
  const showWord = (words) => {
    const randIndex = Math.floor(Math.random() * words.length);
    setWord(words[randIndex]);
  };

  const checker = () => {
    if (word === input) {
      showWord(words);
      setInput("");
      if (input !== "Game Over") {
        setScore((prevState) => prevState + 1);
        setTimer((prevState) => prevState + 3);
        setInput("");
      }
    }
  };
  // for more features
  const submit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <header className="bg-secondary text-center p-3 mb-5">
        <h1>Typing Game</h1>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <form onSubmit={submit}>
              <div className="row mt-4 text-center">
                <div className="col-md-6">
                  <h3 className="display-5">Timer:{timer}</h3>
                </div>
                <div className="col-md-6 text-center">
                  <h3>Score: {score}</h3>
                </div>
              </div>
              <div className="col-lg-6 mx-auto">{timer === 0 ? <button onClick={startGame} className="btn btn-info btn-lg">Start</button> : null}</div>
              <h2 className="display-2 mb-5 text-center">{word}</h2>
              {timer === 0 ? clearInterval(intervalRef.current) : ""}
              <input
                type="text"
                autoFocus
                ref={inputRef}
                onChange={(e) => {
                  setInput(e.target.value.toUpperCase());
                  checker();
                }}
                onKeyPress={(event) =>
                  event.key === "Enter" ? checker() : null
                }
                value={input}
                className="form-control form-control-lg"
                placeholder="Start typing..."
              />
            </form>
          </div>
          <div className="row">
            <div className="col-lg-10 offset-md-5">
              <h5 className=" mt-4 text-center">
                NOTE: Press <b>SPACE</b> or <b>ENTER</b> after type each and
                every word.
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

function useGameOver(timer, setWord) {
  useEffect(() => {
    if (timer === 0) {
      setWord("Game Over");
      document.querySelector("input").disabled = "disabled";
    }
  }, [timer]);
}
