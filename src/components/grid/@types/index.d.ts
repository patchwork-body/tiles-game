import { List, Map } from 'immutable';

type GridState = Map<{
  prevRevealedTiles: Map<number, GridTileData>;
  tiles: List<List<GridTileData>>;
}>;

type GridTileData = {
  index: number;
  row: number;
  column: number;
  removed: boolean;
  hidden: boolean;
  color: string;
};

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
