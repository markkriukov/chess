import logo from "../../assets/bb.png"
import { Colors } from "../../enums/Colors"
import { Cell } from "../Cell"
import { FigureNames } from "../../enums/FigureNames"
import { Objects } from "../boards/Objects"

export class Figure extends Objects {
    cell: Cell
    color: Colors
    id: number
    logo: typeof logo | null
    name: FigureNames
    constructor(color: Colors, cell: Cell) {
        super()
        this.color = color
        this.cell = cell
        this.cell.figure = this
        this.logo = null
        this.name = FigureNames.FIGURE
        this.id = Math.random()
    }

    canMove(target: Cell): boolean {
        if (target.figure?.color === this.color)
            return false
        return true
    }

    copy(cell = this.cell){
        return new Figure(this.color, cell)
    }

    moveFigure(target: Cell) {

    }
}