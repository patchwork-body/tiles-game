import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import { List, Map } from 'immutable';

import { gridReducer, GRID_ACTIONS } from './reducer';
import { GridComponent, GridTileData } from './@types';
import { genColorList, genRandomTiles } from './utils';
import { GridTile } from '../grid-tile';

const Grid: GridComponent = ({ rows, columns }) => {
  const colors = useMemo(() => genColorList(rows * columns), [rows, columns]);
  const tiles = useMemo(() => genRandomTiles({ rows, columns, colors }), [
    rows,
    columns,
    colors,
  ]);

  const [state, dispatch] = useReducer(
    gridReducer,
    Map({ prevRevealedTiles: Map(), tiles }),
  );

  const prevRevealedTilesCount = useMemo(
    () => state.get('prevRevealedTiles').size,
    [state],
  );

  useEffect(() => {
    if (prevRevealedTilesCount === 2) {
      const timeoutId = setTimeout(() => {
        dispatch({ type: GRID_ACTIONS.REMOVE_IDENTITY, payload: {} });
        dispatch({ type: GRID_ACTIONS.HIDE_ALL, payload: {} });
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [prevRevealedTilesCount]);

  const clickHandler = useCallback(
    () => (index: number) => {
      if (prevRevealedTilesCount < 2) {
        const row = (index - (index % columns)) / columns;
        const column = index % columns;

        dispatch({ type: GRID_ACTIONS.REVEAL_TILE, payload: { row, column } });
      }
    },
    [columns, prevRevealedTilesCount],
  );

  return (
    <div className="grid">
      {state.get('tiles').map((row: List<GridTileData>, rowIndex: number) => {
        return row.map((tile: GridTileData, columnIndex: number) => {
          return (
            <GridTile
              key={tile.index}
              row={rowIndex + 1}
              column={columnIndex + 1}
              removed={tile.removed}
              flippedTileProps={{
                ...tile,
                clickHandler,
              }}
            />
          );
        });
      })}
    </div>
  );
};

export { Grid };
