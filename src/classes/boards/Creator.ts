import { Board } from "./Board"
import { BoardClassic } from "./BoardClassic"
import { BoardFisher } from "./BoardFisher"

export class CreatorBoard {
    public factoryMethod(){
        return new Board()
    }
}

export class CreatorBoardClassic extends CreatorBoard {

    public factoryMethod() {
        return new BoardClassic()
    }
}

export class CreatorBoardFisher extends CreatorBoard {
    public factoryMethod() {
        return new BoardFisher()
    }
}

