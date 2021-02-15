type FlippedTileProps = {
  hidden: boolean;
  color: string;
  index: number;
  clickHandler(index: number): void;
};
type FlippedTileComponent = (props: FlippedTileProps) => ReactElement;
