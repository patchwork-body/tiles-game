import { List, Map } from 'immutable';
import { GridAction, GridTileData } from '../@types';

import { GRID_ACTIONS, hideAll, removeIdentity, revealTile } from '../reducer';

describe('gridReducer', () => {
  const state = Map({
    prevRevealedTiles: Map(),
    tiles: List([
      List([
        {
          index: 0,
          row: 0,
          column: 0,
          hidden: true,
          removed: false,
          color: 'black',
        },
        {
          index: 1,
          row: 0,
          column: 1,
          hidden: true,
          removed: false,
          color: 'black',
        },
      ]),
      List([
        {
          index: 2,
          row: 1,
          column: 0,
          hidden: true,
          removed: false,
          color: 'red',
        },
        {
          index: 3,
          row: 1,
          column: 1,
          hidden: true,
          removed: false,
          color: 'red',
        },
      ]),
    ]),
  });

  const revealTileAction = (row = 0, column = 0): GridAction => ({
    type: GRID_ACTIONS.REVEAL_TILE,
    payload: {
      row,
      column,
    },
  });

  test('reveal tile', () => {
    const row = 0;
    const column = 0;

    let nextState = revealTile(state, revealTileAction(row, column));
    expect(nextState.getIn(['tiles', 0, 0]).hidden).toBeFalsy();
    expect(nextState.get('prevRevealedTiles').size).toEqual(1);

    nextState = revealTile(state, revealTileAction(row, column));
    expect(nextState.get('prevRevealedTiles').size).toEqual(1);
  });

  test('remove identity', () => {
    let nextState = revealTile(state, revealTileAction(0, 0));
    expect(nextState.get('prevRevealedTiles').size).toEqual(1);

    nextState = revealTile(nextState, revealTileAction(0, 1));
    expect(nextState.get('prevRevealedTiles').size).toEqual(2);

    nextState = removeIdentity(nextState);
    expect(nextState.getIn(['tiles', 0, 0]).removed).toBeTruthy();
    expect(nextState.getIn(['tiles', 0, 1]).removed).toBeTruthy();
  });

  test('hide all', () => {
    let nextState = revealTile(state, revealTileAction(0, 1));
    nextState = revealTile(nextState, revealTileAction(1, 0));

    nextState = hideAll(nextState);
    expect(nextState.get('prevRevealedTiles').size).toEqual(0);

    expect(
      nextState
        .get('tiles')
        .every((row: List<GridTileData>) =>
          row.every((tile: GridTileData) => tile.hidden),
        ),
    ).toBeTruthy();
  });
});
