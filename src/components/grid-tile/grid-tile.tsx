import React from 'react';

import { FlippedTile } from '../flipped-tile';

const GridTile: GridTileComponent = ({
  row,
  column,
  removed,
  flippedTileProps,
}) => {
  const classes = ['grid__tile'];

  if (removed) {
    classes.push('grid__tile_removed');
  }

  return (
    <div
      className={classes.join(' ')}
      style={{
        gridRow: row,
        gridColumn: column,
      }}
    >
      <FlippedTile {...flippedTileProps} />
    </div>
  );
};

export { GridTile };
