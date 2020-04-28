import React, { useReducer, useEffect, useCallback } from 'react';
import './App.css';
import Node from './Node';

function App() {
  // Creates the Reducer for state management
  const Reducer = (prevState, { type, payload }) => {
    switch (type) {
      case 'start':
        return {
          ...prevState,
          start: payload.start,
        };
      case 'visited':
        return {
          ...prevState,
          visited: payload.visited,
        };
      case 'grid':
        return {
          ...prevState,
          grid: payload.grid,
        };
      case 'isPregame':
        return {
          ...prevState,
          isPregame: payload.isPregame,
        };
      default:
        return;
    }
  };

  // Sets initial vals for state
  const [state, dispatch] = useReducer(Reducer, {
    start: { row: 2, col: 10 },
    visited: [],
    grid: null,
    isPregame: true,
  });

  // Used to update vals in state
  const dataSetter = (section, data) => {
    dispatch({
      type: `${section}`,
      payload: {
        [section]: data,
      },
    });
  };

  // Creates the node table
  const createNode = useCallback(
    (col, row) => {
      return {
        col,
        row,
        isStart: row === state.start.row && col === state.start.col,
        isVisited:
          state.visited.length > 0
            ? state.visited.some((tile) =>
                row === tile.row && col === tile.col
                  ? tile.timer > 0
                    ? true
                    : false
                  : false
              )
            : false,
      };
    },
    [state.start.col, state.start.row, state.visited]
  );

  // Timer for removing visited css class
  useEffect(() => {
    const decrementNodeTimer = () => {
      state.visited.forEach((node) => {
        if (node.timer > 0) {
          setInterval(() => {
            node.timer = --node.timer;
          }, 1000);
        }
      });
    };
    decrementNodeTimer();
  }, [state.visited]);

  // Initiates the node table and updates table each change
  useEffect(() => {
    const getInitialGrid = () => {
      const grid = [];
      for (let row = 0; row < 10; row++) {
        const currentRow = [];
        for (let col = 0; col < 19; col++) {
          currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
      }
      return grid;
    };
    dataSetter('grid', getInitialGrid());
  }, [createNode]);

  // Click handler for nodes
  const handleClick = (ev) => {
    ev.preventDefault();
    const node = ev.target.id.split('-');
    const newRow = Number(node[1]);
    const newCol = Number(node[2]);
    if (state.isPregame) {
      dataSetter('start', { row: newRow, col: newCol });
    } else {
      const newArr = state.visited.concat({
        row: newRow,
        col: newCol,
        timer: 10,
      });
      dataSetter('visited', newArr);
      dataSetter('start', { row: newRow, col: newCol });
    }
  };

  // Initiates the game
  const startGame = () => {
    dataSetter('isPregame', false);
    console.log('Starting...');
  };

  return (
    <>
      <header className='App-header'>Acid Path Trainer</header>
      {state.grid ? (
        <section className='grid'>
          {state.isPregame ? (
            <button type='button' onClick={startGame}>
              Start
            </button>
          ) : (
            ''
          )}
          <h2>
            {state.isPregame
              ? 'Choose a starting position then click start'
              : 'Dodge the acid'}
          </h2>
          {state.grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isStart, isVisited } = node;
                  return (
                    <button key={rowIdx} onClick={handleClick} type='button'>
                      <Node
                        key={nodeIdx}
                        col={col}
                        isStart={isStart}
                        isVisited={isVisited}
                        row={row}
                      ></Node>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </section>
      ) : (
        'Loading...'
      )}
    </>
  );
}

export default App;
