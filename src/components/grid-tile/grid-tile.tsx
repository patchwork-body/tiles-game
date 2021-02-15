import React from 'react';

import { FlippedTile } from '../flipped-tile';

const GridTile: GridTileComponent = ({
  row,
  column,
  removed,
  flippedTileProps,
}) => {
  return (
    <div
      className="grid__tile"
      style={{
        gridRow: row,
        gridColumn: column,
        opacity: removed ? 0 : 1,
      }}
    >
      <FlippedTile {...flippedTileProps} />
    </div>
  );
};

export { GridTile };
