import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Single_UploadComp from '../Single_UploadComp';

describe('Single_UploadComp component', () => {
  it('renders without crashing', () => {
    render(<Single_UploadComp />);
  });

  it('renders Front Picture ImageUploadBox correctly', () => {
    const { getByText } = render(<Single_UploadComp />);
    const frontPictureBox = getByText('Front Picture');
    expect(frontPictureBox).toBeInTheDocument();
  });

  
});
