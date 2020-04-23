import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core'

import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Paper from '@material-ui/core/Paper'


const useStyles = makeStyles({
  main: {
    backgroundColor: 'blue',
    color: 'white',
    outline: '1px solid white',
    height: '5vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '25px'
  },
  drawer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '25px',
    minHeight: '100px',
    maxHeight: '60vh',
    alignSelf: 'center',
    alignItems: 'center'
  },
  historyItem: {
    marginBottom: '10px'
  },
  openHistoryButton: {
    lineHeight: '100%'
  },
  closeHistoryButton: {
    width: '250px',
    marginBottom: '15px'
  }
})

const CalculationHistory = ({ history, handlePasteFromHistory }) => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)

  const mappedHistory = history.map((item) => {
    const isPasteAllowed = Number.isFinite(+item[1]) && !Number.isNaN(item[1])
    const doPaste = () => {
      handlePasteFromHistory(item[1])
      setOpen(false)
    }

    return (
      <ListItem
        key={`${item[0]}${item[1]}`}
        component={Paper}
        elevation={6}
        className={classes.historyItem}>
        <List>
          <ListItem>Expression: {item[0]}</ListItem>
          <ListItem>Result: {item[1]}</ListItem>
          <ListItem>
            {isPasteAllowed &&
              (<Button
                variant='outlined'
                color='primary'
                onClick={doPaste}
              >
                Paste
              </Button>)}
          </ListItem>
        </List>
      </ListItem>
    )
  })

  const openHistoryButtonRef = useRef()

  return (
    <div className={classes.main} >
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        anchor='bottom'
      >
        <div className={classes.drawer}>
          {mappedHistory.length ?
            <List>
              {mappedHistory}
            </List> :
            (<Typography variant='h2'>No calculations were done yet</Typography>)}
          <Button
            variant='contained'
            color='secondary'
            className={classes.closeHistoryButton}
            onClick={() => setOpen(false)}
          >
            Close history
             </Button>
        </div>
      </Drawer>
      <Button
        className={classes.openHistoryButton}
        ref={openHistoryButtonRef}
        onFocus={() => openHistoryButtonRef.current.blur()}
        variant='contained'
        color='secondary'
        onClick={() => setOpen(true)}
      >
        Open history
         </Button>
    </div>
  )
}

export default CalculationHistory
