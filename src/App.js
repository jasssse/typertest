import { useState } from 'react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import './App.css';
import TypingBox from './components/TypingBox';
import StatBar from './components/StatBar';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

function App() {
  var randomWords = require('random-words')
  const [text, setText] = useState('')
  // Replace with randomWords(number)
  const [givenText, setGivenText] = useState(['Hello', 'World', 'LOL'])
  const [correct, setCorrect] = useState(0)
  const [mistakes, setMistake] = useState(0)
  const [wpm, setwpm] = useState(0)


  return (
    <div className="App">
      <StatBar />
      <h3>{givenText.join(' ')}</h3>
      <h3>{text}</h3>
      <TypingBox currentText={text} updateText={setText} />
    </div>
  );
}

export default App;
