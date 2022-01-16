import { useState, useEffect } from 'react'
import './App.css';
import TypingBox from './components/TypingBox';
import StatBar from './components/StatBar';
import Word from './components/Word'



const STARTINGTIME = 30;
const WORDCOUNT = 75;



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

  return (
    <div className="App">
      <div style={{display:'flex', justifyContent:"left", marginBottom:'0%'}}>
        <h1 style={{color:'#2c666e', fontSize:"40px", marginBottom:'0%'}}>{"jasssse/typertest"}</h1>
        {/* <a href="https://github.com/jasssse/typertest"> <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" className="githubIcon" /></a> */}
      </div>

      {/* ToolBar */}
      <StatBar time = {timer} correct={correct}/>

      {/* Given Words */}
      <div className="section" style={{width:'70vw', marginTop:"0px"}}>
        <div className="givenText" style={{textAlign:'left', fontSize:"1.5em"}}>
          {givenText.map((word, i) => (<>
          <Word key={i} userWord={userTextArray[i]} givenWord={word} isLast={i===(userTextArray.length - 1)} inGame={inGame} />
          <span> </span>
          </>))}
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
      </div>
      
      {/* Control Buttons */}
      <div style={{display:'flex', justifyContent:"space-between"}}>
        <h1 style={{color:'#2c666e', fontSize:"40px"}}>{wpm+" wpm"}</h1>
        {finished? <h1 style={{color:'#2c666e', fontSize:"40px"}}>{"accuracy: "+accuracy+"%"}</h1> : <></>}
        <button className='red' onClick={restart}>Restart</button>
      </div>
    </div>
  );
}

export default App;