import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ImageCaptureBox from "../ImageCaptureBox";

jest.mock("../../CameraComponent/CameraComponent", () => ({
  __esModule: true,
  default: jest.fn((props) => (
    <div data-testid="mocked-camera-component">
      {/* Simulate camera component behavior */}
      <button onClick={() => props.onCapture("mockedImageSrc")}>Capture</button>
      <button onClick={props.onClose}>Close</button>
      <button onClick={props.onSwitchCamera}>Switch Camera</button>
    </div>
  )),
}));

describe("ImageCaptureBox component", () => {
  it("renders without crashing", () => {
    render(
      <ImageCaptureBox imageType="Front Picture" setImageDL={jest.fn()} />
    );
    const imageCaptureBox = screen.getByText("Front Picture");
    expect(imageCaptureBox).toBeInTheDocument();
  });

  it("displays the camera icon when no image is selected", () => {
    render(
      <ImageCaptureBox imageType="Front Picture" setImageDL={jest.fn()} />
    );
    const cameraIcon = screen.getByAltText("Capture");
    expect(cameraIcon).toBeInTheDocument();
  });

  it("hides the choose another image button when no image is selected", () => {
    render(
      <ImageCaptureBox imageType="Front Picture" setImageDL={jest.fn()} />
    );
    const cameraIcon = screen.getByAltText("Capture");
    fireEvent.click(cameraIcon);

    // Check if the choose another image button is not initially displayed
    expect(
      screen.queryByRole("button", { name: "Choose another image" })
    ).not.toBeInTheDocument();
  });

  it("does not show the camera icon when capturing is in progress", () => {
    render(
      <ImageCaptureBox imageType="Front Picture" setImageDL={jest.fn()} />
    );

    // Simulate capturing an image
    const cameraIcon = screen.getByAltText("Capture");
    fireEvent.click(cameraIcon);

    expect(screen.queryByAltText("Capture")).not.toBeInTheDocument();
  });

  describe("ImageCaptureBox component", () => {
    it("renders correctly with default props", () => {
      const setImageDL = jest.fn();

      render(<ImageCaptureBox imageType="ID Card" setImageDL={setImageDL} />);

      expect(screen.getByText("ID Card")).toBeInTheDocument();
      expect(
        screen.queryByTestId("mocked-camera-component")
      ).not.toBeInTheDocument();
    });

    it("captures an image and updates state", async () => {
      const setImageDL = jest.fn();

      render(<ImageCaptureBox imageType="ID Card" setImageDL={setImageDL} />);

      fireEvent.click(screen.getByAltText("Capture"));

      fireEvent.click(screen.getByText("Capture"));

      await screen.findByAltText("Selected");
      expect(setImageDL).toHaveBeenCalledWith("mockedImageSrc");
    });
  });
  it("switches to camera mode when camera icon is clicked", () => {
    render(
      <ImageCaptureBox imageType="Front Picture" setImageDL={jest.fn()} />
    );

    const cameraIcon = screen.getByAltText("Capture");
    fireEvent.click(cameraIcon);

    expect(screen.getByTestId("mocked-camera-component")).toBeInTheDocument();
  });
  it("closes camera mode when close button is clicked", () => {
    render(
      <ImageCaptureBox imageType="Front Picture" setImageDL={jest.fn()} />
    );

    const cameraIcon = screen.getByAltText("Capture");
    fireEvent.click(cameraIcon);

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(
      screen.queryByTestId("mocked-camera-component")
    ).not.toBeInTheDocument();
  });
  it("displays the captured photo after it has been taken", async () => {
    const setImageDL = jest.fn();
    render(
      <ImageCaptureBox imageType="Front Picture" setImageDL={setImageDL} />
    );

    const cameraIcon = screen.getByAltText("Capture");
    fireEvent.click(cameraIcon);

    const captureButton = screen.getByText("Capture");
    fireEvent.click(captureButton);

    await screen.findByAltText("Selected");

    expect(screen.getByAltText("Selected")).toBeInTheDocument();
  });
  it("closing camera mode does not trigger image capture", () => {
    const setImageDL = jest.fn();
    render(
      <ImageCaptureBox imageType="Front Picture" setImageDL={setImageDL} />
    );

    const cameraIcon = screen.getByAltText("Capture");
    fireEvent.click(cameraIcon);

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(setImageDL).not.toHaveBeenCalled();
  });
  it("switches to camera mode, captures an image, and updates state", async () => {
    const setImageDL = jest.fn();
    render(
      <ImageCaptureBox imageType="Front Picture" setImageDL={setImageDL} />
    );

    // Click the camera icon to open the camera mode
    const cameraIcon = screen.getByAltText("Capture");
    fireEvent.click(cameraIcon);

    // Simulate capturing an image
    const captureButton = screen.getByText("Capture");
    fireEvent.click(captureButton);

    // Wait for the capture process to complete
    await screen.findByAltText("Selected");

    // Check if the onCapture callback is called with the correct image source
    expect(setImageDL).toHaveBeenCalledWith("mockedImageSrc");
  });
});
