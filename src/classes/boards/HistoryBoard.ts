import { Board } from "./Board";

export class Snapshot {
  private board: Board

  constructor(board: Board) {
    this.board = board
  }

  getBoard() {
    return this.board.clone()
  }
}

export class HistoryBoard {
  private static instance: HistoryBoard;
  list: Snapshot[] = []

  private constructor() { }

  public static getInstance(): HistoryBoard {
    if (!HistoryBoard.instance) {
      HistoryBoard.instance = new HistoryBoard();
    }

    return HistoryBoard.instance;
  }

  addSnapshot(board: Board) {
    this.list.push(board.addSnapshot())
  }

  restore() {
    this.list.pop()
  }
}

