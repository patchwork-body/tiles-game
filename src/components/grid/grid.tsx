import React, { useEffect, useReducer } from 'react';
import { List, Map } from 'immutable';

import { Tile } from '../tile';
import { gridReducer, GRID_ACTIONS } from './reducer';
import { GridComponent, GridTile } from './@types';

const Grid: GridComponent = ({ rows, columns }) => {
  const tiles = [];

  const genNumber = () => Math.floor(Math.random() * 256);
  const colors = new Array(Math.ceil((rows * columns) / 2))
    .fill(null)
    .map(() => {
      return `rgb(${genNumber()}, ${genNumber()}, ${genNumber()})`;
    });
  const shuffleColors = List(colors.concat(colors)).sortBy(Math.random);

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const row = [];
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      const index = columns * rowIndex + columnIndex;
      row.push({
        row: rowIndex,
        column: columnIndex,
        removed: false,
        index,
        hidden: true,
        color: shuffleColors.get(index),
      });
    }
    tiles.push(List.of(...row));
  }

  const [state, dispatch] = useReducer(
    gridReducer,
    Map({ prevRevealedTiles: Map(), tiles: List.of(...tiles) }),
  );

  const prevRevealedTilesCount = state.get('prevRevealedTiles').size;

  useEffect(() => {
    if (prevRevealedTilesCount === 2) {
      const timeoutId = setTimeout(() => {
        dispatch({ type: GRID_ACTIONS.REMOVE_IDENTITY, payload: {} });
        dispatch({ type: GRID_ACTIONS.HIDE_ALL, payload: {} });
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [prevRevealedTilesCount]);

  const clickHandler = (index: number) => {
    if (prevRevealedTilesCount < 2) {
      const row = (index - (index % columns)) / columns;
      const column = index % columns;

      dispatch({ type: GRID_ACTIONS.REVEAL_TILE, payload: { row, column } });
    }
  };

  return (
    <div className="grid">
      {state.get('tiles').map((row: List<GridTile>, rowIndex: number) => {
        return row.map((tile: GridTile, columnIndex: number) => {
          return (
            <div
              className="grid__tile"
              key={rowIndex + columnIndex}
              style={{
                gridRow: rowIndex + 1,
                gridColumn: columnIndex + 1,
                opacity: tile.removed ? 0 : 1,
              }}
            >
              <Tile {...tile} clickHandler={clickHandler} />
            </div>
          );
        });
      })}
    </div>
  );
};

export { Grid };
