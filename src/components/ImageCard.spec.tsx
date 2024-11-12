import { describe, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ImageCard } from './ImageCard';
import { postLike } from '../services/post-like';
import '@testing-library/jest-dom';

vi.mock('../services/post-like', () => ({
  postLike: vi.fn(),
}));

describe('ImageCard', () => {
  const mockProps = {
    id: 1,
    imageUrl: 'https://example.com/image.jpg',
    title: 'Sample Image',
    author: 'John Doe',
    liked: false,
    likesCountNumber: 10,
  };

  it('Should render the ImageCard component', () => {
    render(<ImageCard {...mockProps} />);

    expect(screen.getByAltText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.likesCountNumber.toString())).toBeInTheDocument();
  });
  
  it('Should handle the like action',() => {
    render(<ImageCard {...mockProps} />);
    const likeButton = screen.getByRole('button');
    fireEvent.click(likeButton);
    expect(postLike).toHaveBeenCalledWith(mockProps.id);
  });

  it('Should handle the unlike action',() => {
    render(<ImageCard {...mockProps} liked={true} />);
    const likeButton = screen.getByRole('button');
    fireEvent.click(likeButton);
    expect(postLike).toHaveBeenCalledWith(mockProps.id);
  });

  it('toggles like state and updates likes count when like button is clicked', async () => {
    (postLike as any).mockResolvedValue({ status: 204 });

    render(<ImageCard {...mockProps} />);
    const likeIcon = screen.getByRole('button');

    expect(likeIcon).toHaveAttribute('fill', 'white');
    expect(screen.getByText('10')).toBeInTheDocument();

    await fireEvent.click(likeIcon);

    expect(postLike).toHaveBeenCalledWith(mockProps.id);

    await waitFor(() => {
      expect(likeIcon).toHaveAttribute('fill', '#83f3c6');
      expect(screen.getByText('11')).toBeInTheDocument();
    });

    fireEvent.click(likeIcon);

    // Esperar el color y conteo actualizados
    await waitFor(() => {
      expect(likeIcon).toHaveAttribute('fill', 'white');
      expect(screen.getByText('10')).toBeInTheDocument();
    });

  });

  it('handles postLike error', async () => {
    (postLike as any).mockRejectedValue(new Error('Network Error'));

    render(<ImageCard {...mockProps} />);

    const likeIcon = screen.getByRole('button');

    await fireEvent.click(likeIcon);

    expect(likeIcon).toHaveAttribute('fill', 'white');
    expect(screen.getByText('10')).toBeInTheDocument();
  });

})