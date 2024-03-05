import React from 'react';
import { render } from '@testing-library/react';
import RegistrationFormHeading from '../RegistrationFormHeading';

describe('RegistrationFormHeading component', () => {
  it('renders without crashing', () => {
    render(<RegistrationFormHeading heading="Test Heading" />);
  });

  it('renders the correct heading text', () => {
    const { getByText } = render(<RegistrationFormHeading heading="Test Heading" />);
    const headingText = getByText('Test Heading');
    expect(headingText).toBeInTheDocument();
  });

  it('applies the correct styles', () => {
    const { getByText } = render(<RegistrationFormHeading heading="Test Heading" />);
    const headingElement = getByText('Test Heading');

    expect(headingElement).toHaveClass('text-PrimaryDarkGreenText');
    expect(headingElement).toHaveClass('capitalize');
    expect(headingElement).toHaveClass('text-[34px]');
    expect(headingElement).toHaveClass('leading-10');
    expect(headingElement).toHaveClass('font-normal');
  });
});
