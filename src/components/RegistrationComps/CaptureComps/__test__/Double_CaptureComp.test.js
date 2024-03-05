import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Double_CaptureComp from '../Double_CaptureComp';

describe('Double_CaptureComp component', () => {
  it('renders without crashing', () => {
    render(<Double_CaptureComp />);
  });

  it('renders Front Picture ImageCaptureBox correctly', () => {
    const { getByText } = render(<Double_CaptureComp />);
    const frontPictureBox = getByText('Front Picture');
    expect(frontPictureBox).toBeInTheDocument();
  });

  it('renders Back Picture ImageCaptureBox correctly', () => {
    const { getByText } = render(<Double_CaptureComp />);
    const backPictureBox = getByText('Back Picture');
    expect(backPictureBox).toBeInTheDocument();
  });

});
