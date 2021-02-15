import React, { useReducer } from 'react';
import { List, Map } from 'immutable';

import { Tile } from '../tile';
import { gridReducer } from './reducer';
import { GridComponent, GridTile } from './@types';

const Grid: GridComponent = ({ rows, columns }) => {
  const tiles = [];
  const colors = ['red', 'green', 'blue', 'pink'];

  for (let rowIndex = 1; rowIndex <= rows; rowIndex++) {
    const row = [];
    for (let columnIndex = 1; columnIndex <= columns; columnIndex++) {
      row.push({ hidden: true, color: colors[columnIndex - 1] });
    }
    tiles.push(List.of(...row));
  }

  const [state, dispatch] = useReducer(
    gridReducer,
    Map({ tiles: List.of(...tiles) }),
  );
  console.log(dispatch);

  return (
    <div className="grid">
      {state.get('tiles').map((row: List<GridTile>, rowIndex: number) => {
        return row
          .sortBy(Math.random)
          .map((tile: GridTile, columnIndex: number) => {
            return (
              <div
                className="grid__tile"
                key={rowIndex + columnIndex}
                style={{ gridRow: rowIndex + 1, gridColumn: columnIndex + 1 }}
              >
                <Tile {...tile} />
              </div>
            );
          });
      })}
    </div>
  );
};

export { Grid };
