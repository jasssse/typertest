import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import './App.css';
import TypingBox from './components/TypingBox';
import StatBar from './components/StatBar';
import Word from './components/Word'
import words from 'random-words';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

const STARTINGTIME = 10;
const WORDCOUNT = 50;



function App() {
  let randomWords = require("random-words");
  const [givenText, setGivenText] = useState(randomWords(WORDCOUNT));
  const [userText, setUserText] = useState("");
  const [userTextArray, setUserTextArray] = useState([])
  const [correct, setCorrect] = useState(0);
  const [timer, setTimer] = useState(STARTINGTIME);
  const [inGame, setInGame] = useState(false);
  const [finished, setFinished] = useState(false);
  const [gameJustEnded, setJustEnded] = useState(false);
  const [wpm, setWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  // const [mistakes, setMistake] = useState(0);
  // const [wpm, setwpm] = useState(0);
  // const [finished, setFinished] = useState(false);

  useEffect(() => {
    let interval = null;
    if (inGame && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setTimer(timer);

      if (gameJustEnded) {
        setJustEnded(false);
        endGame();
      }
      return;
    }
    return () => clearInterval(interval);
  }, [inGame, timer, gameJustEnded])

  const startGame = () => {
    setInGame(true);
    setFinished(false);
    setJustEnded(true);
  }

  const endGame = () => {
    console.log(correct);
    calculateScore();
    setFinished(true);
  }

  const restart = () => {
    setGivenText(randomWords(WORDCOUNT));
    setUserText("")
    setUserTextArray([]);
    setCorrect(0)
    setInGame(false);
    setFinished(false);
    setJustEnded(false)
    setTimer(STARTINGTIME)
    setWPM(0);
    setAccuracy(0);
    // setMistake(0)
    // setwpm(0)
  }

  const calculateWPM = () => {
    
    if ((STARTINGTIME - timer) > 0) {
      return Math.round((correct / (STARTINGTIME - timer)) * 60);
    } else {
      return 0;
    }
  }

  const calculateAccuracy = () => {
    if (userTextArray.length > 0) {
      console.log(Math.round((correct / userTextArray.length) * 100))
      return Math.round((correct / userTextArray.length) * 100)
    } else {
      return 0;
    }
  }

  const calculateScore = () => {
    setWPM(calculateWPM());
    setAccuracy(calculateAccuracy());
  }
  // const startTimer = () => {
  //   let interval = setInterval(() => {
  //     setTimer((prevTimer) => {
  //       console.log(inGame);
  //       if (prevTimer > 0) {
  //         return prevTimer - 1;
  //       } else {
  //         setInGame(false);
  //         clearInterval(interval);
  //         return 0;
  //       }

  //       // if(prevTimer === 0) {
  //       //   setInGame(false)
  //       //   clearInterval(interval)
  //       //   return 0
          
  //       //   // Do some state stuff
  //       // } else {
  //       //   return prevTimer - 1
  //       // }
  //     })
  //   }, 1000)
  // }

  return (
    <div className="App">
      {/* ToolBar */}
      {/* <h3>{inGame.toString()}</h3> */}
      <StatBar time = {timer}/>
      <h3>{"Correct: " + correct}</h3>

      {/* Given Words */}
      <div className="section">
        <div className="card" >
          <div className="card-content">
            <div className="content">
              {givenText.map((word, i) => (
                <>
                <Word key={i} userWord={userTextArray[i]} givenWord={word} isLast={i===(userTextArray.length - 1)} inGame={inGame} />
                {/* <span key={i}>
                  {word.split("").map((char, idx) => (
                    <span key={idx}>{char}</span>
                  ))}
                </span> */}
                <span> </span>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Typing area */}
      <div className="section">
        <TypingBox 
          userText={userText}
          setUserText={setUserText}
          userTextArray={userTextArray}
          setUserTextArray={setUserTextArray} 
          setCorrect={setCorrect} 
          givenText={givenText} 
          inGame={inGame} 
          startGame = {startGame} 
          inActive={finished}
        />

        {/* <h3>{text}</h3> */}
      </div>
      
      {/* Control Buttons */}
      <div className="section">
        <span>
        {inGame ? <button onClick={restart}>Restart</button> : <></>}
        {finished? <h1>{"WPM: "+wpm}</h1> : <></>}
        {finished? <h1>{"Accuracy: "+accuracy+"%"}</h1> : <></>}
        </span>
        
      </div>

      {/* End of Game Stats */}
      <div className="section">

      </div>

    </div>
  );
}

export default App;