import { List, Map } from 'immutable';

type GridState = Map<{
  prevRevealedTiles: Map<number, GridTile>;
  tiles: List<List<GridTile>>;
}>;

type GridTile = { removed: boolean } & TileProps;

type GridAction = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
};

type GridReducer = (state: GridState, action: GridAction) => GridState;

type GridProps = {
  rows: number;
  columns: number;
};

type GridComponent = (props: GridProps) => ReactElement;
