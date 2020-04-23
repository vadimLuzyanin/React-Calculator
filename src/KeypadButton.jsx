import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import BackspaceIcon from '@material-ui/icons/Backspace';

const useStyles = makeStyles({
    keypadButton: {
        backgroundColor: (props) => props.inputChar === props.keyForLogic ? 'darkblue' : 'blue',
        color: 'white',
        cursor: 'default',
        flexGrow: 1,
        outline: '1px solid white',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'none',
        fontSize: '25px',
        '&:hover': {
            backgroundColor: (props) => props.inputChar === props.keyForLogic ? 'darkblue' : 'blue',
        }
    }
})

const KeypadButton = ({ keyForLogic, name, handlePress, inputChar, setInputChar, isMobile }) => {
    const props = {inputChar: inputChar, keyForLogic: keyForLogic}
    const classes = useStyles(props)

    return (
        <Fragment>
            {isMobile ?
                (<Button
                    className={classes.keypadButton}
                    onTouchStart={() => handlePress(keyForLogic)}
                    onTouchEnd={() => setInputChar(null)}
                    onTouchCancel={() => setInputChar(null)}
                >
                    {name === '<=' ? <BackspaceIcon /> : name}
                </Button>) :
                (<Button
                    className={classes.keypadButton}
                    onMouseDown={() => handlePress(keyForLogic)}
                    onMouseUp={() => setInputChar(null)}
                    onMouseLeave={() => setInputChar(null)}
                >
                    {name === '<=' ? <BackspaceIcon /> : name}
                </Button>)
            }
        </Fragment>
    )
}

export default KeypadButton
