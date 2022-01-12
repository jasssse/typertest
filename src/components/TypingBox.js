import TextField from '@mui/material/TextField';
import { useState } from 'react'

function TypingBox({ updateText }) {
    const [typedText, setTypedText] = useState('')

    const updateAllText = (newText) => {
        setTypedText(newText)
        updateText(newText)
    }

    return (
        <div>
            <input
                type='textarea'
                placeholder='Type here'
                value={typedText}
                onChange={(e) => updateAllText(e.target.value)
                } />
        </div>
    )
}

export default TypingBox
