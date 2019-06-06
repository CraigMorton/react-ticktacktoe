import React, { Component } from 'react';
import Board from '../components/Board.jsx';
import GameInfo from '../components/GameInfo.jsx';
import { nextTurnState, isGameOver, winningLine } from '../state/gameLogic.js';
import initialState from '../state/initialState';

class TicTacToeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  handleCellClick = event => {
    const index = event.target.dataset.index;
    const grid = this.state.grid.slice();
    grid[index] = this.state.player;
    this.setState({
      grid,
      ...nextTurnState(grid, this.state.player),
      winningCells: winningLine(grid),
    });
  };
  restartGame = () => {
    this.setState(initialState);
  };
  render() {
    return (
      <div>
        <Board
          grid={this.state.grid}
          handleCellClick={this.handleCellClick}
          winningCells={this.state.winningCells}
        />
        <GameInfo
          player={this.state.player}
          opponent={this.state.opponent}
          catsGame={this.state.catsGame}
          gameOver={isGameOver(this.state.grid)}
        />
        <button onClick={this.restartGame}>Restart Game</button>
      </div>
    );
  }
}

export default TicTacToeContainer;
