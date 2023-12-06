import { Cell } from "../Cell"
import { Colors } from "../../enums/Colors"
import { Figure } from "./Figure"
import blackLogo from "../../assets/br.png"
import whiteLogo from "../../assets/wr.png"
import { FigureNames } from "../../enums/FigureNames"

export class Rook extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell)
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.ROOK
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target))
            return false
        if (this.cell.isEmptyVertical(target))
            return true
        if (this.cell.isEmptyHorizonal(target))
            return true
        return false
    }

    copy(cell : Cell){
        return new Rook(this.color, cell)
    }
}