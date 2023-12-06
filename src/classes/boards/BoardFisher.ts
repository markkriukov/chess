import { Board } from "./Board"

export class BoardFisher extends Board{
    private selectAndRemoveEl(arr: number[]) {
        if (arr.length === 0) {
            return undefined;
        }    
        const randomIndex = Math.floor(Math.random() * arr.length);
        const randomElement = arr[randomIndex];
        arr.splice(randomIndex, 1);    
        return randomElement;
    }

    addFigures() {
        this.addPawns()
        let coord = [0,1,2,3,4,5,6,7]
        this.addKnights(this.selectAndRemoveEl(coord),this.selectAndRemoveEl(coord))
        this.addKings(this.selectAndRemoveEl(coord))
        this.addBishops(this.selectAndRemoveEl(coord),this.selectAndRemoveEl(coord))
        this.addQueens(this.selectAndRemoveEl(coord))
        this.addRooks(this.selectAndRemoveEl(coord),this.selectAndRemoveEl(coord))
    }

    getNew(){
        return new BoardFisher()     
    }
}