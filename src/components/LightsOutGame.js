import React, { Component } from "react";

import "./LightsOutGame.css";
import LightsOutCell from "./LightsOutCell";

export default class LightsOutGame extends Component {
  static defaultProps = {
    rows: 5,
    columns: 5,
    startCells: 5
  };

  constructor(props) {
    super(props);

    this.gameContainer = React.createRef();

    this.state = {
      grid: this.generateGrid(props.rows, props.columns, props.startCells)
    };
  }

  generateGrid(rows, columns, startCells) {
    const grid = [];

    let litCells = 0;

    for (let i = 0, l = rows; i < l; i += 1) {
      grid[i] = [];

      for (let j = 0, k = columns; j < k; j += 1) {
        grid[i][j] = {
          isLit: false,
          isChanging: false,
          changeStartPoint: "center",
          animDuration: 400
        };
      }
    }

    while (litCells < startCells) {
      lit_cells: for (let i = 0, l = rows; i < l; i += 1) {
        for (let j = 0, k = columns; j < k; j += 1) {
          if (litCells >= startCells) break lit_cells;

          const cell = grid[i][j];
          if (
            !cell.isLit &&
            Math.floor(Math.random() * rows * columns) === (i + 1) * (j + 1)
          ) {
            cell.isLit = true;
            litCells += 1;
          }
        }
      }
    }

    return grid;
  }

  changeColor = (
    row,
    column,
    delay = 0,
    startPoint = "center",
    animDuration = 400
  ) => {
    setTimeout(() => {
      this.setState(state => {
        state.grid[row][column].isLit = !state.grid[row][column].isLit;

        state.grid[row][column].isChanging = true;
        state.grid[row][column].changeStartPoint = startPoint;
        state.grid[row][column].animDuration = animDuration;
        return state;
      });
    }, delay);

    setTimeout(() => {
      this.setState(state => {
        state.grid[row][column].isChanging = false;
        return state;
      });
    }, delay + animDuration);
  };

  toggleCell = e => {
    if (e.target === this.gameContainer.current) return;

    const row = +e.target.getAttribute("data-row");
    const column = +e.target.getAttribute("data-col");

    const grid = this.state.grid;

    if (grid[row][column].isChanging) return;

    this.changeColor(row, column, 0, "center", 200);

    if (grid[row + 1]) {
      this.changeColor(row + 1, column, 176, "bottom", 200);
    }

    if (grid[row - 1]) {
      this.changeColor(row - 1, column, 176, "top", 200);
    }

    if (grid[row][column - 1] !== undefined) {
      this.changeColor(row, column - 1, 176, "left", 200);
    }

    if (grid[row][column + 1] !== undefined) {
      this.changeColor(row, column + 1, 176, "right", 200);
    }
  };

  restart = () => {
    const { rows, columns, startCells } = this.props;
    this.setState({ grid: this.generateGrid(rows, columns, startCells) });
  };

  render() {
    let wonTheGame = true;
    const gridItems = this.state.grid.reduce((acc, row, rowIndex) => {
      acc.push(
        row.map((cell, columnIndex) => {
          if (cell.isLit) wonTheGame = false;

          return (
            <LightsOutCell
              key={"" + rowIndex + columnIndex}
              row={rowIndex}
              column={columnIndex}
              {...cell}
            ></LightsOutCell>
          );
        })
      );
      return acc;
    }, []);

    return (
      <div
        ref={this.gameContainer}
        className="LightsOut-container"
        onClick={this.toggleCell}
      >
        {gridItems}
        {wonTheGame && (
          <div className="LightsOut-Winbox" onClick={e => e.stopPropagation()}>
            <p>You have won!</p>
            <button className="LightsOut-RestartBtn" onClick={this.restart}>
              Restart?
            </button>
          </div>
        )}
      </div>
    );
  }
}
