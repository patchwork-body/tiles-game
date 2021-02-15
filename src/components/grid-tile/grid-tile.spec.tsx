import React from 'react';
import { render } from '@testing-library/react';

import { GridTile } from './grid-tile';

describe('GridTile', () => {
  const row = 0;
  const column = 0;
  const removed = false;
  const flippedTileProps: FlippedTileProps = {
    index: 0,
    color: 'black',
    hidden: true,
    clickHandler: jest.fn(),
  };

  const props: GridTileProps = {
    row,
    column,
    removed,
    flippedTileProps,
  };

  test('should be removed', () => {
    const { container } = render(<GridTile {...{ ...props, removed: true }} />);
    expect(
      container.firstElementChild?.classList.contains('grid__tile_removed'),
    ).toBeTruthy();
  });

  test('should match snapshot', () => {
    const { container } = render(<GridTile {...props} />);
    expect(container.firstElementChild).toMatchSnapshot();
  });
});
