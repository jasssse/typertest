
function Word({userWord, givenWord, isLast, inGame}) {

    function getCharBackground(index) {
        if (index + 1 > userWord.length) {
            return 'rgba(0,0,0,0)'
        } else if (userWord[index] === givenWord[index]){
            return 'rgba(0,255,0,0.3)';
        } else {
            return 'rgba(255,0,0,0.3)';
        }
    }

    // Current word being typed
    if (isLast && inGame) {
        return (
        <span>
            {givenWord.split("").map((char, idx) => (<span key={idx} style={{backgroundColor: getCharBackground(idx)}}>{char}</span> )) }
        </span>
        )
    } else if (typeof userWord === "undefined") {
        return (
            <span style={{ color: 'rgba(0,0,0,0.3)' }}>
                {givenWord}
            </span>
        )
    } else {
        return (
            <span style={{ color: ((userWord === givenWord) ? 'green' : 'red') }}>
                {givenWord}
            </span>
        )
    }
}

export default Word
