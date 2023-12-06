import { Cell } from "../Cell"
import { Colors } from "../../enums/Colors"
import { Figure } from "./Figure"
import blackLogo from "../../assets/bp.png"
import whiteLogo from "../../assets/wp.png"
import { FigureNames } from "../../enums/FigureNames"

export class Pawn extends Figure {
    private isFirstStep: boolean = true

    constructor(color: Colors, cell: Cell) {
        super(color, cell)
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.PAWN
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target))
            return false
        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1
        const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2

        if (((target.y === this.cell.y + direction) || (this.isFirstStep
            && (target.y === this.cell.y + firstStepDirection) && this.cell.board.getCell(target.x, target.y - direction).isEmpty()))
            && target.x === this.cell.x
            && this.cell.board.getCell(target.x, target.y).isEmpty()) {
            return true
        }

        if (target.y === this.cell.y + direction
            && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
            && this.cell.isEnemy(target)) {
            return true
        }

        return false
    }

    copy(cell : Cell){
        let newPawn = new Pawn(this.color, cell)
        newPawn.isFirstStep = this.isFirstStep
        if((cell.y === 6 && this.color === Colors.WHITE) || (cell.y === 2 && this.color === Colors.BLACK))
        newPawn.isFirstStep = true
        return newPawn
    }

    moveFigure(target: Cell) {
        super.moveFigure(target)
        this.isFirstStep = false
    }
}