import { useState } from 'react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import './App.css';
import TypingBox from './components/TypingBox';
import StatBar from './components/StatBar';
import words from 'random-words';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));




function App() {
  let randomWords = require("random-words");

  // Replace with randomWords(number)
  const [givenText, setGivenText] = useState(randomWords(10));
  const [text, setText] = useState("");
  const [correct, setCorrect] = useState(0);
  // const [mistakes, setMistake] = useState(0);
  // const [wpm, setwpm] = useState(0);
  // const [finished, setFinished] = useState(false);

  const restart = () => {
    // randomWords(10)
    setGivenText(randomWords(10));
    setText("");
    // setCorrect(0)
    // setMistake(0)
    // setwpm(0)
  };

  return (
    <div className="App">
      <StatBar />
      <h3>{"Correct: " + correct}</h3>
      <h3>{givenText.join(" ")}</h3>
      <h3>{text}</h3>
      <TypingBox text={text} setText={setText} setCorrect={setCorrect} givenText={givenText}/>
      <button onClick={restart}>Restart</button>
    </div>
  );
}

export default App;


// TODO
// Array comparison
// Prettier

// Hello World LOL 