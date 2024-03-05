import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageUploadBox from "../ImageUploadBox";

describe("ImageUploadBox component", () => {
  it("renders without crashing", () => {
    render(<ImageUploadBox imageType="Front Picture" />);
    const imageUploadBox = screen.getByText("Front Picture");
    expect(imageUploadBox).toBeInTheDocument();
  });

  it("does not display the filename if no image is selected", () => {
    render(<ImageUploadBox imageType="Front Picture" setImageDL={jest.fn()} />);

    // Check if the filename is not displayed
    expect(screen.queryByText("sample.jpg")).not.toBeInTheDocument();
  });

  it("displays the camera icon when no image is selected", () => {
    render(<ImageUploadBox imageType="Front Picture" setImageDL={jest.fn()} />);
    const cameraIcon = screen.getByAltText("Italian Trulli");
    expect(cameraIcon).toBeInTheDocument();
  });

  it('does not display the "Choose another image" button if no image is selected', () => {
    render(<ImageUploadBox imageType="Front Picture" setImageDL={jest.fn()} />);

    // Check if the 'Choose another image' button is not displayed initially
    expect(
      screen.queryByAltText("Choose another image")
    ).not.toBeInTheDocument();
  });

  it("displays the correct image type text", () => {
    render(
      <ImageUploadBox
        imageType="Custom Image Type"
        img=""
        setImageDL={() => {}}
        onImageChange={() => {}}
      />
    );

    // Ensure the correct image type text is displayed
    expect(screen.getByText("Custom Image Type")).toBeInTheDocument();
  });
});
