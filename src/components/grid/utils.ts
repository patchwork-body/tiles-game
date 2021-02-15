import { List } from 'immutable';
import { GridTileData } from './@types';

const genRandomInt = (to = 256): number => Math.floor(Math.random() * to);

const genColorList = (size: number): List<string> => {
  const colors = new Array(Math.ceil(size / 2)).fill(null).map(() => {
    return `rgb(${genRandomInt()}, ${genRandomInt()}, ${genRandomInt()})`;
  });
  return List(colors.concat(colors)).sortBy(Math.random);
};

const genRandomTiles = ({
  rows,
  columns,
  colors,
}: {
  rows: number;
  columns: number;
  colors: List<string>;
}): List<GridTileData> => {
  let tiles = List();

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    let row = List();

    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      const index = columns * rowIndex + columnIndex;

      row = row.push({
        row: rowIndex,
        column: columnIndex,
        removed: false,
        index,
        hidden: true,
        color: colors.get(index),
      });
    }

    tiles = tiles.push(row);
  }
  return tiles;
};

export { genRandomInt, genColorList, genRandomTiles };
