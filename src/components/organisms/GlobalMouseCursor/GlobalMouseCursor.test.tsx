import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GlobalMouseCursor from './GlobalMouseCursor';

describe('<GlobalMouseCursor />', () => {
  test('it should mount', () => {
    render(<GlobalMouseCursor />);

    const globalmousecursor = screen.getByTestId('GlobalMouseCursor');

    expect(globalmousecursor).toBeInTheDocument();
  });
});