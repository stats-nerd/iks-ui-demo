// ButtonSectionGreenBg.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ButtonSectionGreenBg from '../ButtonSectionGreenBg';

describe('ButtonSectionGreenBg component', () => {
  it('renders with the correct props and handles click event', () => {
    // Mock the function passed as a prop
    const onClickMock = jest.fn();

    // Render the ButtonSectionGreenBg component with initial props
    const { getByText } = render(
      <ButtonSectionGreenBg
        buttonName="Click Me"
        onClick={onClickMock}
        className="custom-class"
      />
    );

    // Check if the ButtonSectionGreenBg component renders with the correct button name
    expect(getByText('Click Me')).toBeInTheDocument();

    // Trigger the click event on the button
    fireEvent.click(getByText('Click Me'));

    // Check if the onClick function is called
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('applies the custom class correctly', () => {
    // Render the ButtonSectionGreenBg component without a custom class
    const { container: containerWithoutClass } = render(
      <ButtonSectionGreenBg buttonName="Test" onClick={() => {}} />
    );

    // Render the ButtonSectionGreenBg component with a custom class
    const { container: containerWithClass } = render(
      <ButtonSectionGreenBg buttonName="Test" onClick={() => {}} className="custom-class" />
    );

    // Check if the custom class is applied to the button
    expect(containerWithoutClass.firstChild).not.toHaveClass('custom-class');
    expect(containerWithClass.firstChild).toHaveClass('custom-class');
  });
});
