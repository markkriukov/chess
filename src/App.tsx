import { useEffect, useState } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import Timer from './components/Timer';
import LostFigures from './components/LostFigures';
import { Colors } from './enums/Colors';
import { FigureNames } from './enums/FigureNames';
import { Player } from './classes/Player';
import { Cell } from './classes/Cell';
import { Board } from './classes/boards/Board';
import { HistoryBoard } from './classes/boards/HistoryBoard';
import { CreatorBoard } from './classes/boards/Creator';

let listBoards = HistoryBoard.getInstance()
const whitePlayer = new Player(Colors.WHITE)
const blackPlayer = new Player(Colors.BLACK)
let defCreator = new CreatorBoard()

function App() {
  const [board, setBoard] = useState<Board>(defCreator.factoryMethod())
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  const [winnerPlayer, setWinnerPlayer] = useState<Player | null>(null)
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

  useEffect(() => {
    restart()
  }, [])

  function restart(creator = defCreator) {
    listBoards.list = []
    const newBoard = creator.factoryMethod();
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
    setCurrentPlayer(whitePlayer)
    setSelectedCell(null)
    listBoards.addSnapshot(newBoard)
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    listBoards.addSnapshot(board)
  }

  function determineWinner(winnercolor: Colors | null) {
    if (winnercolor != null)
      setWinnerPlayer(blackPlayer?.color === winnercolor ? blackPlayer : whitePlayer)
    else
      setWinnerPlayer(null)
  }

  function checkMoves() {
    let areMoves = false
    for (let i = 0; i < board.cells.length; i++) {
      const row = board.cells[i]
      for (let j = 0; j < row.length; j++) {
        const targetl = row[j]
        if (targetl.figure?.color !== currentPlayer?.color) {
          if (board.highlightCells(targetl, false)) {
            areMoves = true
            break
          }
        }
      }
      if (areMoves === true)
        break
    }
    if (!areMoves && currentPlayer?.color) {
      determineWinner(currentPlayer?.color === Colors.BLACK ? Colors.BLACK : Colors.WHITE)
    }
  }

  function click(cell: Cell) {
    if (winnerPlayer === null) {
      if (selectedCell && selectedCell !== cell && cell.available) {
        if (selectedCell.moveFigure(cell)) {
          if (currentPlayer && cell.figure?.name === FigureNames.KING) {
            if (cell.figure?.color === Colors.BLACK)
              board.blackKingCell = cell
            else
              board.whiteKingCell = cell
          }
          swapPlayer()
          checkMoves()
          setSelectedCell(null)
        }
      } else {
        if (cell.figure?.color === currentPlayer?.color)
          setSelectedCell(cell)
      }
    }
  }

  function restore() {
    if (listBoards.list.length >= 2) {
      listBoards.restore()
      setBoard(listBoards.list[listBoards.list.length - 1].getBoard() || board)
      if (listBoards.list.length % 2) {
        setCurrentPlayer(whitePlayer)
      } else {
        setCurrentPlayer(blackPlayer)
      }
      setSelectedCell(null)
    }
  }

  return (
    <div className="app">
      <Timer currentPlayer={currentPlayer} restart={restart} determineWinner={determineWinner} restore={restore} />
      <BoardComponent board={board} setBoard={setBoard}
        currentPlayer={currentPlayer}
        winnerPlayer={winnerPlayer}
        selectedCell={selectedCell} click={click} />
      <div className="inwidth">
        <LostFigures
          title="Black figures"
          figures={board.lostBlackFigures}
        />
        <LostFigures
          title="White figures"
          figures={board.lostWhiteFigures}
        />
      </div>
    </div>
  );
}

export default App;
