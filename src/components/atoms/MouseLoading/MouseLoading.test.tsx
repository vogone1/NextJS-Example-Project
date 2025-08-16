import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MouseLoading from './MouseLoading';

describe('<MouseLoading />', () => {
  test('it should mount', () => {
    render(<MouseLoading />);

    const mouseLoading = screen.getByTestId('MouseLoading');

    expect(mouseLoading).toBeInTheDocument();
  });
});