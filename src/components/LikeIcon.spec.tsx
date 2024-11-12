import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LikeIcon } from './LikeIcon';

describe('LikeIcon', () => {
  it('Should render the LikeIcon component', () => {
    render(<LikeIcon />);
  });

  it('se renderiza correctamente con los props proporcionados', () => {
    const { container } = render(<LikeIcon fill="red" />);

    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('width', '32');
    expect(svgElement).toHaveAttribute('height', '32');
    expect(svgElement).toHaveAttribute('viewBox', '0 0 512 512');

    const pathElement = container.querySelector('path');
    expect(pathElement).toBeInTheDocument();
    expect(pathElement).toHaveAttribute('fill', 'red');
  });


  it('aplica props SVG adicionales', () => {
    const { container } = render(<LikeIcon fill="blue" width={50} height={50} />);

    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('width', '50');
    expect(svgElement).toHaveAttribute('height', '50');

    const pathElement = container.querySelector('path');
    expect(pathElement).toHaveAttribute('fill', 'blue');
  });
});