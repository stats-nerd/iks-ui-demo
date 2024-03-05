import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Card from "../Card";

const doctorMock = {
  name: "Dr. John Doe",
  photo: "doctor.jpg",
  rating: 4.5,
  type: "General Physician",
  dateTime: "2024-03-01T10:00:00",
  forms: [
    { isFormCompleted: true, formName: "Form 1" },
    { isFormCompleted: false, formName: "Form 2" },
  ],
};

test("renders Card component with different doctor details", () => {
  const anotherDoctorMock = {
    name: "Dr. Jane Smith",
    photo: "doctor2.jpg",
    rating: 3.8,
    type: "Dermatologist",
    dateTime: "2024-03-02T14:30:00",
    forms: [
      { isFormCompleted: false, formName: "Form A" },
      { isFormCompleted: true, formName: "Form B" },
    ],
  };

  render(
    <MemoryRouter>
      <Card doctor={anotherDoctorMock} />
    </MemoryRouter>
  );

  expect(screen.getByText("Dr. Jane Smith")).toBeInTheDocument();
  expect(screen.getByAltText("Dr. Jane Smith")).toBeInTheDocument();
  expect(screen.getByText("Dermatologist")).toBeInTheDocument();
  expect(screen.getByText("Please complete Form A")).toBeInTheDocument();
});
