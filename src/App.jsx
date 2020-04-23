import React, { useState, useEffect, Fragment } from 'react'
import useInputLogic from './useInputLogic'
import Keypad from './Keypad'
import CssBaseline from '@material-ui/core/CssBaseline'
import Display from './Display'
import CalculationHistory from './CalculationHistory'
import { useTheme, useMediaQuery, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  container: {
    margin: '10vh auto',
    padding: '0 5vw',
    minWidth: '50vw',
    maxWidth: '1200px',
  }
})

const App = () => {
  const classes = useStyles()

  const [inputChar, setInputChar] = useState(null)

  const [input, handlePress, history, handlePasteFromHistory] = useInputLogic(setInputChar)

  const [isMobile, setIsMobile] = useState(false)

  const theme = useTheme()
  const mathches = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    setIsMobile(mathches)
  }, [mathches])

  const handleKeyDown = (e) => {
    handlePress(e.key)
  }

  const handleKeyUp = (e) => {
    let key = e.key

    if (key === 'Enter') key = '='
    if (key === ',') key = '.'

    if (inputChar === key) {
      setInputChar(null)
    }
  }

  return (
    <Fragment>
      <CssBaseline />
      <div className={classes.container}>
        <Display
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          input={input} />
        <CalculationHistory
          history={history}
          handlePasteFromHistory={handlePasteFromHistory} />
        <Keypad
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          handlePress={handlePress}
          inputChar={inputChar}
          setInputChar={setInputChar}
          isMobile={isMobile} />
      </div>
    </Fragment>
  )
}

export default App
