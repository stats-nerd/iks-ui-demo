import { render } from '@testing-library/react';
import YellowLoader from '../YellowLoader';
import { YellowCircleLoaderIcon } from '../../../assets';

describe('YellowLoader component', () => {
  it('renders without crashing', () => {
    const { getByAltText } = render(<YellowLoader />);
    const loaderImage = getByAltText('loader');

    expect(loaderImage).toBeInTheDocument();
  });

 
  it('applies the correct CSS class for animation', () => {
    const { getByAltText } = render(<YellowLoader />);
    const loaderImage = getByAltText('loader');

    // Check if the loader image has the expected CSS class for animation
    expect(loaderImage).toHaveClass('animate-spin-anti-clockwise');
  });

  

  it('renders with the correct alt text', () => {
    const { getByAltText } = render(<YellowLoader />);
    const loaderImage = getByAltText('loader');

    // Check if the alt text is set correctly
    expect(loaderImage).toHaveAttribute('alt', 'loader');
  });
});
