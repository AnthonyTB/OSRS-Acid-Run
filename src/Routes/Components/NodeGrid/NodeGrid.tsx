import React, { FunctionComponent, useContext } from "react";
import { Context } from "../../../Context";
import Node from "../Node/Node";

const NodeGrid: FunctionComponent = () => {
  const { isPregame, dataSetter, visited, grid } = useContext(Context);

  // Click handler for nodes
  const handleClick = (ev: any) => {
    ev.preventDefault();
    const node = ev.target.id.split("-");
    const newRow = Number(node[1]);
    const newCol = Number(node[2]);
    if (isPregame) {
      dataSetter("start", { row: newRow, col: newCol });
    } else {
      const newArr = visited.concat({
        row: newRow,
        col: newCol,
        timer: 10,
      });
      dataSetter("visited", newArr);
      dataSetter("start", { row: newRow, col: newCol });
    }
  };

  return (
    <>
      {grid ? (
        <section className="grid">
          {grid.map((row: any, rowIdx: number) => {
            return (
              <div key={rowIdx}>
                {row.map((node: any, nodeIdx: number) => {
                  const { row, col, isStart, isVisited } = node;
                  return (
                    <button key={rowIdx} onClick={handleClick} type="button">
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
        "Loading..."
      )}
    </>
  );
};

export default NodeGrid;
