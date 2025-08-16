import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MouseDefault from './MouseDefault';

describe('<MouseDefault />', () => {
  test('it should mount', () => {
    render(<MouseDefault />);

    const mouseDefault = screen.getByTestId('MouseDefault');

    expect(mouseDefault).toBeInTheDocument();
  });
});