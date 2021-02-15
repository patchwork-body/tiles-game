import React from 'react';
import { render } from '@testing-library/react';

import { Grid } from '../grid';
import { GridProps } from '../@types';

describe('GridTile', () => {
  const rows = 4;
  const columns = 4;

  const props: GridProps = {
    rows,
    columns,
  };

  test('count children', () => {
    const { container } = render(<Grid {...props} />);
    expect(container.firstElementChild?.childElementCount).toEqual(
      rows * columns,
    );
  });
});
