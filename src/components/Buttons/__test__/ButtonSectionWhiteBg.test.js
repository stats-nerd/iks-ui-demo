// ButtonSectionWhiteBg.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ButtonSectionWhiteBg from '../ButtonSectionWhiteBg';

describe('ButtonSectionWhiteBg component', () => {
  it('renders with the correct props and handles click event', () => {
    // Mock the function passed as a prop
    const onClickMock = jest.fn();

    // Render the ButtonSectionWhiteBg component with initial props
    const { getByText } = render(
      <ButtonSectionWhiteBg
        buttonName="Click Me"
        onClick={onClickMock}
        className="custom-class"
      />
    );

    // Check if the ButtonSectionWhiteBg component renders with the correct button name
    expect(getByText('Click Me')).toBeInTheDocument();

    // Trigger the click event on the button
    fireEvent.click(getByText('Click Me'));

    // Check if the onClick function is called
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('applies the custom class correctly', () => {
    // Render the ButtonSectionWhiteBg component without a custom class
    const { container: containerWithoutClass } = render(
      <ButtonSectionWhiteBg buttonName="Test" onClick={() => {}} />
    );

    // Render the ButtonSectionWhiteBg component with a custom class
    const { container: containerWithClass } = render(
      <ButtonSectionWhiteBg buttonName="Test" onClick={() => {}} className="custom-class" />
    );

    // Check if the custom class is applied to the button
    expect(containerWithoutClass.firstChild).not.toHaveClass('custom-class');
    expect(containerWithClass.firstChild).toHaveClass('custom-class');
  });
});
