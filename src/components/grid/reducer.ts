import { List, Map } from 'immutable';
import { GridAction, GridReducer, GridState, GridTileData } from './@types';

enum GRID_ACTIONS {
  REVEAL_TILE = '@REVEAL_TILE',
  REMOVE_IDENTITY = '@REMOVE_IDENTITY',
  HIDE_ALL = '@HIDE_ALL',
}

const revealTile = (state: GridState, action: GridAction): GridState => {
  const { row, column } = action.payload;

  const targetTile = {
    ...state.getIn(['tiles', row, column]),
    hidden: false,
  };

  return state
    .updateIn(['tiles', row, column], () => targetTile)
    .update('prevRevealedTiles', (prev: Map<number, GridTileData>) =>
      prev.set(targetTile.index, targetTile),
    );
};

const removeIdentity = (state: GridState): GridState => {
  const { result: hasIdentity } = state.get('prevRevealedTiles').reduce(
    (prev: { result: boolean; value: string }, tile: GridTileData) => {
      return {
        result: prev.value === tile.color,
        value: tile.color,
      };
    },
    { result: false, value: '' },
  );

  if (hasIdentity) {
    return state
      .get('prevRevealedTiles')
      .reduce((state: GridState, revealedTile: GridTileData) => {
        return state.updateIn(
          ['tiles', revealedTile.row, revealedTile.column],
          (tile: GridTileData) => ({
            ...tile,
            removed: true,
          }),
        );
      }, state);
  } else {
    return state;
  }
};

const hideAll = (state: GridState): GridState => {
  return state
    .update('tiles', (tiles: List<List<GridTileData>>) =>
      tiles.map((row: List<GridTileData>) =>
        row.map(tile => ({ ...tile, hidden: true })),
      ),
    )
    .update('prevRevealedTiles', () => Map());
};

const gridReducer: GridReducer = (state, action) => {
  if (action.type === GRID_ACTIONS.REVEAL_TILE) {
    return revealTile(state, action);
  } else if (action.type === GRID_ACTIONS.REMOVE_IDENTITY) {
    return removeIdentity(state);
  } else if (action.type === GRID_ACTIONS.HIDE_ALL) {
    return hideAll(state);
  } else {
    return state;
  }
};

export { GRID_ACTIONS, gridReducer, revealTile, removeIdentity, hideAll };
