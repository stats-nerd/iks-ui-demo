import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginImage from '../LoginImage';

describe('LoginImage component', () => {
  it('renders without crashing', () => {
    render(<LoginImage src="test-image.jpg" alt="Test Image" />);
    const image = screen.getByAltText('Test Image');
    expect(image).toBeInTheDocument();
  });

  it('renders with the correct src and alt attributes', () => {
    render(<LoginImage src="test-image.jpg" alt="Test Image" />);
    const image = screen.getByAltText('Test Image');
    expect(image).toHaveAttribute('src', 'test-image.jpg');
  });

  it('applies additional styles to the image', () => {
    render(
      <LoginImage
        src="test-image.jpg"
        alt="Test Image"
        imageStyles="border-2 rounded-md"
      />
    );
    const image = screen.getByAltText('Test Image');
    expect(image).toHaveClass('border-2');
    expect(image).toHaveClass('rounded-md');
  });

});
