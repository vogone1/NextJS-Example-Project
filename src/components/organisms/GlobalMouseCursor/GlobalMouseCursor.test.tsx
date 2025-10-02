import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import GlobalMouseCursor from './GlobalMouseCursor';

describe('<GlobalMouseCursor />', () => {
  test('it should mount', () => {
    render(<GlobalMouseCursor />);

    const globalmousecursor = screen.getByTestId('GlobalMouseCursor');

    expect(globalmousecursor).toBeInTheDocument();
  });
});