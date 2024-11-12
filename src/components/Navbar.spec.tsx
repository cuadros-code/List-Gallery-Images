import { describe, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  
  it('Should render the Navbar component', () => {
    render(<Navbar handleSearch={vi.fn()} />);
    expect(screen.getByText('Gallery')).toBeInTheDocument();
  });

  it('Should handle the search action',() => {
    const handleSearch = vi.fn();
    render(<Navbar handleSearch={handleSearch} />);
    const searchInput = screen.getByPlaceholderText("You're looking for something?");
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(handleSearch.mock.calls[0][0].target.value).toBe('test');
  });

})