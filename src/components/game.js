import React, { Component } from "react";
import Grid from "./grid";

class Game extends Component {
  constructor(props) {
    super(props);
    // I did 30 x 30 cuz I was to lazy to do width x height parameters, not good
    // add width and height
    this.state = {
      cells: Array(30)
        .fill(null)
        .map((item) => (item = Array(30).fill(false))),
      speed: 125,
    };
    this.selectCell = this.selectCell.bind(this);
  }

  selectCell(i, j) {
    const cells = this.state.cells.slice();
    cells[i][j] = !cells[i][j];

    this.setState({
      cells: cells,
    });
  }

  fillGrid() {
    const cells = this.state.cells.slice();
    const rareness = 3;
    for (let i = 0; i < 30; i++)
      for (let j = 0; j < 30; j++) {
        cells[i][j] = Math.floor(Math.random() * rareness) === 1;
      }
    this.setState({
      cells: cells,
    });
  }

  cloneCells = (cells) => {
    return JSON.parse(JSON.stringify(cells));
  };

  gameTurn = () => {
    const newCells = this.cloneCells(this.state.cells.slice());

    // this is the most ugliest implementation you possibly could find
    for (let i = 0; i < 30; i++)
      for (let j = 0; j < 30; j++) {
        let aliveCells = 0;
        for (let ins = 0; ins < 3; ins++) {
          if (this.state.cells[i - 1] && this.state.cells[i - 1][j - 1 + ins])
            aliveCells++;
          if (this.state.cells[i + 1] && this.state.cells[i + 1][j + 1 - ins])
            aliveCells++;
          if (ins === 1) {
            if (this.state.cells[i][j - 1]) aliveCells++;
            if (this.state.cells[i][j + 1]) aliveCells++;
          }
        }
        if (aliveCells < 2 || aliveCells > 3) {
          newCells[i][j] = false;
        } else if (aliveCells === 3) {
          newCells[i][j] = true;
        }
      }

    this.setState({
      cells: newCells,
    });
  };

  startGame = () => {
    clearInterval(this.gameTicksId);
    this.gameTicksId = setInterval(this.gameTurn, this.state.speed);
  };

  componentDidMount() {
    this.fillGrid();
  }

  render() {
    return (
      <>
        <Grid cells={this.state.cells} selectCell={this.selectCell} />
        <button className="btn" onClick={this.gameTurn}>
          Turn
        </button>
        <button className="btn" onClick={this.startGame}>
          Play
        </button>
      </>
    );
  }
}

export default Game;
