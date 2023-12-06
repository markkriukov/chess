import { Cell } from "../Cell"
import { Colors } from "../../enums/Colors"
import { Figure } from "./Figure"
import blackLogo from "../../assets/bb.png"
import whiteLogo from "../../assets/wb.png"
import { FigureNames } from "../../enums/FigureNames"

export class Bishop extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell)
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.BISHOP
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target))
            return false
        if (this.cell.isEmptyDiagonal(target))
            return true
        return false
    }

    copy(cell : Cell){
        return new Bishop(this.color, cell)
    }
}