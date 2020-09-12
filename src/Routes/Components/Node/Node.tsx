import React, { FunctionComponent } from "react";
import "./Node.css";

interface IProps {
  col: any;
  isVisited: boolean;
  row: any;
  isStart: boolean;
}

// Renders each node
const Node: FunctionComponent<IProps> = (props) => {
  const { col, isVisited, row, isStart } = props;
  const visitStatus = isVisited ? "visited" : "unvisited";
  const startStatus = isStart ? "start" : "";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${visitStatus} ${startStatus}`}
    ></div>
  );
};

export default Node;
