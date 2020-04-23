import React from 'react'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles({
    textFieldInputPropsStyle: {
        height: '10vh',
        textAlign: 'right',
        fontSize: '25px',
        caretColor: 'transparent',
    }
})

const Display = ({ input, onKeyDown, onKeyUp }) => {
    const classes = useStyles()

    return (
        <TextField
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            readOnly
            variant='outlined'
            fullWidth
            inputProps={{ className: classes.textFieldInputPropsStyle, readOnly: true }}
            className={classes.display}
            value={input} />
    )
}

export default Display