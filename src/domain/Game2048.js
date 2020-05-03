import { generateRandomId } from "../utils/id";
import { Direction } from "../types/Direction";

export default class Game2048 {
  score;
  cells;

  constructor() {
    this.restart();
  }

  getCells() {
    return this.cells;
  }

  getAliveCells = () => this.cells.filter((cell) => cell.status === "ALIVE");

  getScore() {
    return this.score;
  }

  getIsGameOver() {
    return this.isGameOver();
  }

  restart() {
    this.cells = [];
    this.score = 0;
    this.addNewCell();
    this.addNewCell();
  }

  getAvailablePositions() {
    const availablePositions = [];
    for (let x = 0; x <= 3; x++) {
      for (let y = 0; y <= 3; y++) {
        if (this.getAliveCellAtPosition(x, y)) continue;
        availablePositions.push({ x, y });
      }
    }
    return availablePositions;
  }

  getAliveCellAtPosition(x, y) {
    return (
      this.getAliveCells().filter((cell) => cell.x === x && cell.y === y)[0] ||
      null
    );
  }

  sortCells = (direction) => {
    let sorter = null;
    switch (direction) {
      case Direction.Right:
        sorter = (cellA, cellB) => cellB.x - cellA.x;
        break;
      case Direction.Left:
        sorter = (cellA, cellB) => cellA.x - cellB.x;
        break;
      case Direction.Down:
        sorter = (cellA, cellB) => cellB.y - cellA.y;
        break;
      case Direction.Up:
        sorter = (cellA, cellB) => cellA.y - cellB.y;
        break;
    }
    this.cells = this.cells.sort(sorter);
  };

  getRandomAvailablePosition = () => {
    const availablePositions = this.getAvailablePositions();
    return availablePositions.splice(
      Math.floor(Math.random() * availablePositions.length),
      1
    )[0];
  };

  getInitialCellValue = () => {
    return Math.random() < 0.5 ? 2 : 4;
  };

  addNewCell() {
    const position = this.getRandomAvailablePosition();
    const value = this.getInitialCellValue();
    this.cells.push({
      x: position.x,
      y: position.y,
      value,
      status: "ALIVE",
      id: generateRandomId(),
    });
  }

  findFirstCellToTheLeft(cell) {
    for (let x = cell.x - 1; x >= 0; x--) {
      const cellFound = this.getAliveCellAtPosition(x, cell.y);
      if (cellFound) return cellFound;
    }
    return null;
  }

  findFirstCellToTheRight(cell) {
    for (let x = cell.x + 1; x <= 3; x++) {
      const cellFound = this.getAliveCellAtPosition(x, cell.y);
      if (cellFound) return cellFound;
    }
    return null;
  }

  findFirstCellToTheBottom = (cell) => {
    for (let y = cell.y + 1; y <= 3; y++) {
      const cellFound = this.getAliveCellAtPosition(cell.x, y);
      if (cellFound) return cellFound;
    }
    return null;
  };

  findFirstCellToTheTop = (cell) => {
    for (let y = cell.y - 1; y >= 0; y--) {
      const cellFound = this.getAliveCellAtPosition(cell.x, y);
      if (cellFound) return cellFound;
    }
    return null;
  };

  removeMergedCells = () => {
    this.cells = this.cells
      .filter((cell) => cell.status !== "MERGED")
      .map((cell) => ({ ...cell }));
  };

  getInitialEmptySpots = (direction) => {
    switch (direction) {
      case Direction.Right:
      case Direction.Down:
        return [3, 3, 3, 3];
      case Direction.Left:
      case Direction.Up:
        return [0, 0, 0, 0];
    }
  };

  newMove = (direction) => {
    this.removeMergedCells();
    this.sortCells(direction);
    let emptySpots = this.getInitialEmptySpots(direction);
    for (let cell of this.cells) {
      if (cell.status === "MERGED") continue;
      if (direction === Direction.Right) {
        const firstCellToTheLeft = this.findFirstCellToTheLeft(cell);
        if (firstCellToTheLeft && firstCellToTheLeft.value === cell.value) {
          this.score += cell.value * 2;
          firstCellToTheLeft.status = "MERGED";
          firstCellToTheLeft.x = emptySpots[cell.y];
          cell.value = cell.value * 2;
        }
        cell.x = emptySpots[cell.y];
        emptySpots[cell.y] = emptySpots[cell.y] - 1;
      } else if (direction === Direction.Left) {
        const firstCellToTheRight = this.findFirstCellToTheRight(cell);
        if (firstCellToTheRight && firstCellToTheRight.value === cell.value) {
          this.score += cell.value * 2;
          firstCellToTheRight.status = "MERGED";
          firstCellToTheRight.x = emptySpots[cell.y];
          cell.value = cell.value * 2;
        }
        cell.x = emptySpots[cell.y];
        emptySpots[cell.y] = emptySpots[cell.y] + 1;
      } else if (direction === Direction.Up) {
        const firstCellToTheBottom = this.findFirstCellToTheBottom(cell);
        if (firstCellToTheBottom && firstCellToTheBottom.value === cell.value) {
          this.score += cell.value * 2;
          firstCellToTheBottom.status = "MERGED";
          firstCellToTheBottom.y = emptySpots[cell.x];
          cell.value = cell.value * 2;
        }
        cell.y = emptySpots[cell.x];
        emptySpots[cell.x] = emptySpots[cell.x] + 1;
      } else if (direction === Direction.Down) {
        const firstCellToTheTop = this.findFirstCellToTheTop(cell);
        if (firstCellToTheTop && firstCellToTheTop.value === cell.value) {
          this.score += cell.value * 2;
          firstCellToTheTop.status = "MERGED";
          firstCellToTheTop.y = emptySpots[cell.x];
          cell.value = cell.value * 2;
        }
        cell.y = emptySpots[cell.x];
        emptySpots[cell.x] = emptySpots[cell.x] - 1;
      }
    }
    if (!this.isBoardFull()) {
      this.addNewCell();
    }
  };

  isBoardFull = () => this.getAliveCells().length === 16;

  isGameOver = () => {
    if (!this.isBoardFull()) return false;
    for (let x = 0; x <= 3; x++) {
      for (let y = 0; y <= 3; y++) {
        const cell = this.getAliveCellAtPosition(x, y);
        const rightCell = this.getAliveCellAtPosition(x + 1, y);
        const bottomCell = this.getAliveCellAtPosition(x, y + 1);
        if (
          (rightCell && rightCell.value === cell.value) ||
          (bottomCell && bottomCell.value === cell.value)
        )
          return false;
      }
    }
    return true;
  };
}
