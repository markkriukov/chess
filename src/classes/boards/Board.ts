import { Cell } from "../Cell"
import { Colors } from "../../enums/Colors"
import { FigureNames } from "../../enums/FigureNames"
import { Figure } from "../figures/Figure"
import { Pawn } from "../figures/Pawn"
import { King } from "../figures/King"
import { Queen } from "../figures/Queen"
import { Bishop } from "../figures/Bishop"
import { Knight } from "../figures/Knight"
import { Rook } from "../figures/Rook"
import { Objects } from "./Objects"
import { Snapshot } from "./HistoryBoard"

export class Board extends Objects{
    blackKingCell: Cell | null = null
    cells: Cell[][] = []
    lostBlackFigures: Figure[] = []
    lostWhiteFigures: Figure[] = []
    whiteKingCell: Cell | null = null

    addSnapshot(){
        return new Snapshot(this)
    }

    protected  addBishops(x1 = 2, x2 = 5) {
        new Bishop(Colors.BLACK, this.getCell(x1, 0))
        new Bishop(Colors.BLACK, this.getCell(x2, 0))
        new Bishop(Colors.WHITE, this.getCell(x1, 7))
        new Bishop(Colors.WHITE, this.getCell(x2, 7))
    }

    protected  addKings(x = 4) {
        new King(Colors.BLACK, this.getCell(x, 0))
        this.whiteKingCell = this.getCell(x, 7)
        new King(Colors.WHITE, this.getCell(x, 7))
        this.blackKingCell = this.getCell(x, 0)
    }

    protected  addKnights(x1 = 1, x2 = 6) {
        new Knight(Colors.BLACK, this.getCell(x1, 0))
        new Knight(Colors.BLACK, this.getCell(x2, 0))
        new Knight(Colors.WHITE, this.getCell(x1, 7))
        new Knight(Colors.WHITE, this.getCell(x2, 7))
    }

    protected  addPawns() {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.BLACK, this.getCell(i, 1))
            new Pawn(Colors.WHITE, this.getCell(i, 6))
        }
    }

    protected  addQueens(x = 3) {
        new Queen(Colors.BLACK, this.getCell(x, 0))
        new Queen(Colors.WHITE, this.getCell(x, 7))
    }

    protected  addRooks(x1 = 0, x2 = 7) {
        new Rook(Colors.BLACK, this.getCell(x1, 0))
        new Rook(Colors.BLACK, this.getCell(x2, 0))
        new Rook(Colors.WHITE, this.getCell(x1, 7))
        new Rook(Colors.WHITE, this.getCell(x2, 7))
    }

    addFigures() {
    }

    addLostFigure(figure: Figure) {
        figure.color === Colors.BLACK
            ? this.lostBlackFigures.push(figure)
            : this.lostWhiteFigures.push(figure)
    }

    clone() {
        const newBoard = this.getNew()     
        if(this.cells.length !== 0){
            for (let i = 0; i < 8; i++) {
                const row: Cell[] = []
                for (let j = 0; j < 8; j++) {
                    row.push(this.cells[i][j].copy(newBoard))
                }
                newBoard.cells.push(row)
            }
        }
        newBoard.lostBlackFigures = []
        for (let i = 0; i < this.lostBlackFigures.length; i++) {
            newBoard.lostBlackFigures.push(this.lostBlackFigures[i])
        }        
        newBoard.lostWhiteFigures = []
        for (let i = 0; i < this.lostWhiteFigures.length; i++) {
            newBoard.lostWhiteFigures.push(this.lostWhiteFigures[i])
        }
        newBoard.whiteKingCell = this.whiteKingCell?.copy(newBoard) || null
        newBoard.blackKingCell = this.blackKingCell?.copy(newBoard) || null
        return newBoard
    }

    getCell(x: number, y: number) {
        return this.cells[y][x]
    }

    getNew(){
        return new Board()
    }

    highlightCells(selectedCell: Cell | null, f: boolean = true) {
        if(selectedCell?.y)
        selectedCell = this.cells[selectedCell.y][selectedCell?.x]
        // пошук усіх доступних ходів
        let name = selectedCell?.figure?.name
        let availableArray: Cell[] = []
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for (let j = 0; j < row.length; j++) {
                const target = row[j]
                target.available = !!selectedCell?.figure?.canMove(target)
                if (target.available){
                    availableArray.push(target)
                }
            }
        }

        // визначення союзного короля
        let KingCell: Cell | null = null
        if (selectedCell?.figure?.color === Colors.BLACK)
            KingCell = this.blackKingCell
        else
            KingCell = this.whiteKingCell

        // скасування ходів, які призводять до атаки Короля або не рятують його
        for (let k = 0; k < availableArray.length; k++) {
            let tmpg = availableArray[k].figure
            if (selectedCell?.figure) {
                availableArray[k].setFigure(selectedCell?.figure)
                selectedCell.figure = null
            }

            for (let i = 0; i < this.cells.length; i++) {
                const row = this.cells[i]
                for (let j = 0; j < row.length; j++) {
                    const targetl = row[j]
                    if (targetl.figure && targetl.figure?.color !== availableArray[k]?.figure?.color) {
                        if (name === FigureNames.KING) {
                            if (targetl.figure.canMove(availableArray[k])) {
                                availableArray[k].available = false
                            }
                        } else if (KingCell) {
                            if (targetl.figure.canMove(KingCell)) {
                                availableArray[k].available = false
                            }
                        }

                    }
                }

            }

            // повернення фігури у початкове положення
            if (selectedCell) {
                let tmp = availableArray[k].figure
                if (tmp) {
                    selectedCell.setFigure(tmp)
                }
                if (tmpg) {
                    availableArray[k].setFigure(tmpg)
                } else {
                    availableArray[k].figure = null
                }

            }
        }

        // // повертаємо true якщо є ходи
        for (let i = 0; i < availableArray.length; i++) {
            if (availableArray[i].available === true) {
                if (!f) {
                    for (let i = 0; i < availableArray.length; i++) {
                        availableArray[i].available = false
                    }
                }
                return true
            }
        }
        return false
    }

    initCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null))
                } else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null))
                }
            }
            this.cells.push(row)
        }
    }
}