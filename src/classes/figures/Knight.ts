import { Cell } from "../Cell"
import { Colors } from "../../enums/Colors"
import { Figure } from "./Figure"
import blackLogo from "../../assets/bn.png"
import whiteLogo from "../../assets/wn.png"
import { FigureNames } from "../../enums/FigureNames"

export class Knight extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell)
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.KNIGHT
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target))
            return false
        const dx = Math.abs(this.cell.x - target.x)
        const dy = Math.abs(this.cell.y - target.y)

        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1)
    }

    copy(cell : Cell){
        return new Knight(this.color, cell)
    }
}