import React from 'react'
import KeypadButton from './KeypadButton'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    keypad: {
        display: 'flex',
        flexDirection: 'column',
        height: '60vh'
    },
    row: {
        display: 'flex',
        flexGrow: '1'
    }
})

const Keypad = ({ handlePress, inputChar, setInputChar, isMobile, onKeyDown, onKeyUp }) => {
    const classes = useStyles()

    const createRowOfKeypadButtons = (keysAndNamesArray) => {
        const result = keysAndNamesArray.map((item, index) => {
            return (
                <KeypadButton
                    key={index}
                    isMobile={isMobile}
                    keyForLogic={Array.isArray(item) ? item[0] : item}
                    name={Array.isArray(item) ? item[1] : item}
                    handlePress={handlePress}
                    inputChar={inputChar}
                    setInputChar={setInputChar} />
            )
        })

        return (
            <div className={classes.row}>
                {result}
            </div>
        )
    }

    const row1 = createRowOfKeypadButtons(['(', ')', ['Delete', 'C'], ['Backspace', '<=']])
    const row2 = createRowOfKeypadButtons(['7', '8', '9', '+'])
    const row3 = createRowOfKeypadButtons(['4', '5', '6', '-'])
    const row4 = createRowOfKeypadButtons(['1', '2', '3', '*'])
    const row5 = createRowOfKeypadButtons(['+/-', '0', '.', '/'])
    const row6 = createRowOfKeypadButtons(['='])


    return (
        <div
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            className={classes.keypad}
        >
            {row1}
            {row2}
            {row3}
            {row4}
            {row5}
            {row6}
        </div>
    )
}

export default Keypad
