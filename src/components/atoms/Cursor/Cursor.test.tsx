import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Cursor from './Cursor';

describe('<Cursor />', () => {
    test('it should mount', () => {
        render(<Cursor type={'button'} />);

        const cursor = screen.getByTestId('Cursor');

        expect(cursor).toBeInTheDocument();
    });
});
