import { FC, Fragment, useEffect } from 'react'
import CellComponent from './CellComponent'
import { Colors } from '../enums/Colors'
import { Cell } from '../classes/Cell'
import { Player } from '../classes/Player'
import blackKingLogo from "../assets/bk.png"
import whiteKingLogo from "../assets/wk.png"
import { Board } from '../classes/boards/Board'

interface BoardProps {
    board: Board
    setBoard: (board: Board) => void
    currentPlayer: Player | null
    winnerPlayer: Player | null
    selectedCell: Cell | null
    click: (cell: Cell) => void
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, winnerPlayer, selectedCell, click }) => {
    useEffect(() => {
        board.highlightCells(selectedCell)
        setBoard(board.clone())
    }, [selectedCell])

    return (
        <div>
            <div className='head'>
                {winnerPlayer === null ?
                    <h3>Current player: <img className="mini-logo" alt="" src={currentPlayer?.color === Colors.BLACK ? blackKingLogo : whiteKingLogo}/></h3> :
                    <h3>Winner: <img className="mini-logo" alt="" src={currentPlayer?.color === Colors.BLACK ? blackKingLogo : whiteKingLogo}/></h3>}
            </div>
            <div className='board'>
                {board.cells.map((row, index) =>
                    <Fragment key={index}>
                        {row.map(cell =>
                            <CellComponent click={click} cell={cell} key={cell.id} selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y} />
                        )}
                    </Fragment>
                )}
            </div>
        </div>
    )
}

export default BoardComponent