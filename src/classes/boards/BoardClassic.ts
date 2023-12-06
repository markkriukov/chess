import { Board } from "./Board"

export class BoardClassic extends Board{
    addFigures() {
        this.addPawns()
        this.addKnights()
        this.addKings()
        this.addBishops()
        this.addQueens()
        this.addRooks()
    }

    getNew(){
        return new BoardClassic()     
    }
}