import React from "react";
import Cell from "./cell";

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.selectCell = this.selectCell.bind(this);
  }

  selectCell(i, j) {
    this.props.selectCell(i, j);
  }

  render() {
    const cells = this.props.cells;
    const rows = [];
    for (let i = 0; i < 30; i++)
      for (let j = 0; j < 30; j++) {
        rows.push(
          <Cell
            alive={cells[i][j] ? "cell filled" : "cell empty"}
            key={i + " " + j}
            row={i}
            col={j}
            selectCell={this.selectCell}
          />
        );
      }
    return (
      <>
        <div className="grid">{rows}</div>
      </>
    );
  }
}

export default Grid;
