type GridTileProps = {
  row: number;
  column: number;
  removed: boolean;
  flippedTileProps: FlippedTileProps;
};
type GridTileComponent = (props: GridTileProps) => ReactElement;
