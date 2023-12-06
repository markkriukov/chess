import { FC, useEffect, useRef, useState } from 'react'
import { Player } from "../classes/Player"
import { Colors } from "../enums/Colors"
import { CreatorBoard, CreatorBoardClassic, CreatorBoardFisher } from '../classes/boards/Creator'

interface TimerProps {
  currentPlayer: Player | null
  restart: (creator : CreatorBoard) => void
  determineWinner: (color: Colors | null) => void
  restore : () => void
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart, determineWinner, restore}) => {
  const timechess = 300
  const [blackTime, setBlackTime] = useState(timechess)
  const [whiteTime, setWhiteTime] = useState(timechess)
  const timer = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    startTimer()
  }, [currentPlayer])

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current)
    }
    const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
    timer.current = setInterval(callback, 1000)
  }

  function decrementBlackTimer() {
    setBlackTime(prev => {
      if (prev > 0) {
        return prev - 1
      } else {
        determineWinner(Colors.WHITE)
        return prev
      }
    })
  }

  function decrementWhiteTimer() {
    setWhiteTime(prev => {
      if (prev > 0) {
        return prev - 1
      } else {
        determineWinner(Colors.BLACK)
        return prev
      }
    })
  }

  function handleRestart(creator : CreatorBoard) {
    setWhiteTime(timechess)
    setBlackTime(timechess)
    determineWinner(null)
    restart(creator)
  }

  return (
    <div>
      <button className='button' onClick={() => handleRestart(new CreatorBoardClassic())}>CLASSIC</button>
      <button className='button' onClick={() => handleRestart(new CreatorBoardFisher())}>FISHER</button>
      <button className='button' onClick={() => restore()}>RETURN</button>
      <div className="inwidth">
        <h2 className="timer">White - {Math.floor(whiteTime / 60) + ":" + String(whiteTime - Math.floor(whiteTime / 60) * 60).padStart(2, '0')}</h2>
        <h2 className="timer">Black - {Math.floor(blackTime / 60) + ":" + String(blackTime - Math.floor(blackTime / 60) * 60).padStart(2, '0')}</h2>
      </div>
    </div>
  )
}

export default Timer
