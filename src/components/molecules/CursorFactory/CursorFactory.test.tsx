import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CursorFactory from './CursorFactory';

describe('<CursorFactory />', () => {
  test('it should mount', () => {
    render(<CursorFactory />);

    const cursorFactory = screen.getByTestId('CursorFactory');

    expect(cursorFactory).toBeInTheDocument();
  });
});