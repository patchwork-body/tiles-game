import React from 'react';

const Tile: TileComponent = ({ color, hidden }) => {
  const classList = ['tile'];

  if (hidden) {
    classList.push('tile_hidden');
  }

  return (
    <div className={classList.join(' ')} style={{ background: color }}></div>
  );
};

export { Tile };
