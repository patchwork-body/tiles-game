import { GridReducer, GridTile } from './@types';

enum GRID_ACTIONS {
  REVEAL_TILE = '@REVEAL_TILE',
}

const gridReducer: GridReducer = (state, action) => {
  if (action.type === GRID_ACTIONS.REVEAL_TILE) {
    const { row, column } = action.payload;
    const targetTile = state.get('tiles').get(row).get(column);

    return state
      .updateIn(
        ['tiles', action.payload.row, action.payload.column],
        (tile: GridTile) => ({ ...tile, hidden: false }),
      )
      .update('prevRevealedTile', () => targetTile);
  } else {
    return state;
  }
};

export { GRID_ACTIONS, gridReducer };
