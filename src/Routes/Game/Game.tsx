import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { Context } from "../../Context";
import { NodeGrid } from "../Components";

const Game: FunctionComponent = () => {
  const { start, dataSetter, visited } = useContext(Context);
  console.log(start);

  // Creates the node table
  const createNode = useCallback(
    (col, row) => {
      return {
        col,
        row,
        isStart: row === start.row && col === start.col,
        isVisited:
          visited.length > 0
            ? visited.some((tile: any) =>
                row === tile.row && col === tile.col
                  ? tile.timer > 0
                    ? true
                    : false
                  : false
              )
            : false,
      };
    },
    [start.col, start.row, visited]
  );

  // Timer for removing visited css class
  // Initiates the node table and updates table each change
  useEffect(() => {
    if (visited) {
      const decrementNodeTimer = () => {
        visited.forEach((node: any) => {
          if (node.timer > 0) {
            setInterval(() => {
              node.timer = --node.timer;
            }, 1000);
          }
        });
      };
      decrementNodeTimer();
    }

    const getInitialGrid = () => {
      console.log("hi");
      const grid = [];
      for (let row = 0; row < 10; row++) {
        const currentRow: any[] = [];
        for (let col = 0; col < 19; col++) {
          currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
      }
      return grid;
    };
    dataSetter("grid", getInitialGrid());
  }, [visited, createNode]);

  return (
    <section className="Game">
      <NodeGrid />
    </section>
  );
};

export default Game;
