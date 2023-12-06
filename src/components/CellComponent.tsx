import { FC } from 'react'
import { Cell } from '../classes/Cell'

interface CellProps {
    click: (cell: Cell) => void
    cell: Cell
    selected: boolean
}

const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
    return (
        <div className={['cell', cell.color, selected ? "selected" : '', cell.available && cell.figure ? 'underAttack' : ''].join(" ")}
            onClick={() => click(cell)}
        >
            {cell.available && !cell.figure && <div className={"available"} />}
            {cell.figure?.logo && <img src={cell.figure.logo} alt="" />}
        </div>
    )
}

export default CellComponent