import React from 'react';
import { render } from '@testing-library/react';

import { FlippedTile } from './flipped-tile';

describe('GridTile', () => {
  const index = 0;
  const color = 'black';
  const hidden = true;
  const clickHandler = jest.fn();

  const props: FlippedTileProps = {
    index,
    color,
    hidden,
    clickHandler,
  };

  test('should be visible', () => {
    const { container } = render(
      <FlippedTile {...{ ...props, hidden: false }} />,
    );
    expect(
      container.firstElementChild?.classList.contains('flipped-tile_hidden'),
    ).toBeFalsy();
  });

  test('should match snapshot', () => {
    const { container } = render(<FlippedTile {...props} />);
    expect(container.firstElementChild).toMatchSnapshot();
  });
});
