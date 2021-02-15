import { GridReducer, GridTile } from './@types';

enum GRID_ACTIONS {
  REVEAL_TILE = '@REVEAL_TILE',
}

const gridReducer: GridReducer = (state, action) => {
  switch (action.type) {
    case GRID_ACTIONS.REVEAL_TILE:
      return state.updateIn(
        ['tiles', action.payload.row, action.payload.column],
        (tile: GridTile) => ({ ...tile, hidden: false }),
      );
    default:
      return state;
  }
};

export { GRID_ACTIONS, gridReducer };
