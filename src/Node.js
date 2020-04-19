import React from 'react';
import './Node.css';

export default function Node(props) {
  const { col, isVisited, row } = props;
  console.log(isVisited);
  const visitStatus = isVisited ? 'visited' : 'unvisited';
  const startStatus = props.isStart ? 'start' : '';

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${visitStatus} ${startStatus}`}
    ></div>
  );
}
