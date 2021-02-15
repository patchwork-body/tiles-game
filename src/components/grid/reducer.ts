import { List, Map } from 'immutable';
import { GridReducer, GridState, GridTile } from './@types';

enum GRID_ACTIONS {
  REVEAL_TILE = '@REVEAL_TILE',
  REMOVE_IDENTITY = '@REMOVE_IDENTITY',
  HIDE_ALL = '@HIDE_ALL',
}

const gridReducer: GridReducer = (state, action) => {
  if (action.type === GRID_ACTIONS.REVEAL_TILE) {
    const { row, column } = action.payload;

    const targetTile = {
      ...state.getIn(['tiles', row, column]),
      hidden: false,
    };

    return state
      .updateIn(['tiles', row, column], () => targetTile)
      .update('prevRevealedTiles', (prev: Map<number, GridTile>) =>
        prev.set(targetTile.index, targetTile),
      );
  } else if (action.type === GRID_ACTIONS.REMOVE_IDENTITY) {
    const { result: hasIdentity } = state.get('prevRevealedTiles').reduce(
      (prev: { result: boolean; value: string }, tile: GridTile) => ({
        result: prev.value === tile.color,
        value: tile.color,
      }),
      { result: false, value: '' },
    );

    if (hasIdentity) {
      return state
        .get('prevRevealedTiles')
        .reduce((state: GridState, revealedTile: GridTile) => {
          return state.updateIn(
            ['tiles', revealedTile.row, revealedTile.column],
            (tile: GridTile) => ({
              ...tile,
              removed: true,
            }),
          );
        }, state);
    } else {
      return state;
    }
  } else if (action.type === GRID_ACTIONS.HIDE_ALL) {
    return state
      .update('tiles', (tiles: List<List<GridTile>>) =>
        tiles.map((row: List<GridTile>) =>
          row.map(tile => ({ ...tile, hidden: true })),
        ),
      )
      .update('prevRevealedTiles', () => Map());
  } else {
    return state;
  }
};

export { GRID_ACTIONS, gridReducer };
