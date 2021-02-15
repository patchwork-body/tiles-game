import React from 'react';

import { Tile } from '../tile';

const Grid: GridComponent = ({ rows, columns }) => {
  const tiles = [];

  for (let rowIndex = 1; rowIndex <= rows; rowIndex++) {
    for (let columnIndex = 1; columnIndex <= columns; columnIndex++) {
      tiles.push(
        <div
          style={{ gridColumn: columnIndex, gridRow: rowIndex }}
          className="grid__tile"
        >
          <Tile />
        </div>,
      );
    }
  }

  return <div className="grid">{tiles}</div>;
};

export { Grid };
