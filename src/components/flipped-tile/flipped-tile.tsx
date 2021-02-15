import React, { SyntheticEvent } from 'react';

const FlippedTile: FlippedTileComponent = ({
  index,
  color,
  hidden,
  clickHandler,
}) => {
  const classList = ['flipped-tile'];

  if (hidden) {
    classList.push('flipped-tile_hidden');
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

export { FlippedTile };
