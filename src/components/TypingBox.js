function TypingBox({ userText, setUserText, userTextArray, setUserTextArray, setCorrect, givenText, inGame, startGame, inActive }) {
  // Text comparison:
  const calculateMetrics = (e) => {
    // Start the game on type
    if (!inGame) {
      startGame();
    }
    // parse typed text into array of words
    
    const wordsArr = e.target.value.split(" ");
    let correctCount = 0;

    for (let i = 0; i < Math.min(wordsArr.length, givenText.length); i++) {
      if (wordsArr[i] === givenText[i]) {
        correctCount++;
      }
    }
    
    setCorrect(correctCount);
  };

  return (
    <div>
      <textarea
        disabled={inActive}
        style={{ height: "100px", width: "100%", resize:"none", marginTop:"1em", fontFamily:"system-ui", fontSize:"1em"}}
        
        type="textarea"
        placeholder="Start typing..."
        value={userText}
        onChange={(e) => {
          setUserText(e.target.value);
          setUserTextArray(e.target.value.split(" "));
          calculateMetrics(e);
        }}
      />
    </div>
  );
}

export default TypingBox
