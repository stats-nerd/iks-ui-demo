import React from 'react';
import { render } from '@testing-library/react';
import OcrLoader from '../OcrLoader';

describe('OcrLoader component', () => {
  it('renders without crashing', () => {
    render(<OcrLoader />);
  });

  it('renders YellowLoader component', () => {
    const { getByAltText } = render(<OcrLoader />);
    const yellowLoader = getByAltText('loader');
    expect(yellowLoader).toBeInTheDocument();
  });

  it('renders "Please Wait" text', () => {
    const { getByText } = render(<OcrLoader />);
    const pleaseWaitText = getByText('Please Wait');
    expect(pleaseWaitText).toBeInTheDocument();
  });

  it('renders "OCR processing in progress" text', () => {
    const { getByText } = render(<OcrLoader />);
    const ocrProcessingText = getByText('OCR processing in progress');
    expect(ocrProcessingText).toBeInTheDocument();
  });
});
