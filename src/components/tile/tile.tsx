import React, { SyntheticEvent } from 'react';

const Tile: TileComponent = ({ index, color, hidden, clickHandler }) => {
  const classList = ['tile'];

  if (hidden) {
    classList.push('tile_hidden');
  }

  const onClick = (event: SyntheticEvent) => {
    const index = Number(event.currentTarget.getAttribute('data-index'));
    clickHandler(index);
  };

  return (
    <div
      data-index={index}
      className={classList.join(' ')}
      style={{ background: color }}
      onClick={onClick}
    ></div>
  );
};

export { Tile };
