import TextField from '@mui/material/TextField';
import { useState } from 'react'

function TypingBox({ text, setText, correct, setCorrect, givenText }) {
  //   function updateAllText(e) {
  //     let newText = e.target.value;
  //     setTypedText(newText);
  //     updateText(newText);
  //     updateMetrics();
  //     calculateMetrics();
  //   }

  // Text comparison:
  const calculateMetrics = (e) => {
    // parse typed text into array of words
    
    const wordsArr = e.target.value.split(" ");
    let correctCount = 0;

    for (let i = 0; i < Math.min(wordsArr.length, givenText.length); i++) {
      if (wordsArr[i] === givenText[i]) {
        correctCount++;
      }
    }
      console.log(correctCount);
    setCorrect(correctCount);
  };

  return (
    <div>
      <textarea
        style={{ height: "20em", width: "50em" }}
        type="textarea"
        placeholder="Type here"
        value={text}
        onChange={(e) => {
            
            setText(e.target.value);
            //console.log(e.target.value);
            calculateMetrics(e);
        }}
      />
    </div>
  );
}

export default TypingBox
