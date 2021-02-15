type TileProps = {
  hidden: boolean;
  color: string;
  index: number;
  clickHandler(index: number): void;
};
type TileComponent = (props: TileProps) => ReactElement;
