import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BelowSection from '../BelowSection';

describe('BelowSection component', () => {
  it('renders without crashing', () => {
    render(<BelowSection />);
  });

  it('renders "Enter Manually" button correctly', () => {
    const { getByText } = render(<BelowSection />);
    const enterManuallyButton = getByText('Enter Manually');
    expect(enterManuallyButton).toBeInTheDocument();
  });

  it('calls manuallyBtnClickFunc when "Enter Manually" button is clicked', () => {
    const mockClickFunc = jest.fn();
    const { getByText } = render(<BelowSection manuallyBtnClickFunc={mockClickFunc} />);
    const enterManuallyButton = getByText('Enter Manually');

    fireEvent.click(enterManuallyButton);
    expect(mockClickFunc).toHaveBeenCalled();
  });

  it('renders "I will do this later" and "Why are we asking these?" links correctly', () => {
    const { getByText } = render(<BelowSection />);
    const laterLink = getByText('I will do this later');
    const whyAskingLink = getByText('Why are we asking these?');

    expect(laterLink).toBeInTheDocument();
    expect(whyAskingLink).toBeInTheDocument();
  });
});
