import React from "react";
import { render, screen } from "@testing-library/react";
import AppointmentDetails from "../AppointmentDetails";

describe("AppointmentDetails Component", () => {
  test("renders doctor name correctly", () => {
    render(
      <AppointmentDetails
        doctorName="Dr. Smith"
        specialty="Cardiology"
        dateTime="2024-02-01 10:00 AM"
        patientName="John Doe"
        appointmentType="Follow-up"
        ratingValue={4}
      />
    );

    const doctorNameElement = screen.getByText("Dr. Smith");
    expect(doctorNameElement).toBeInTheDocument();
  });

  test("renders specialty correctly", () => {
    render(
      <AppointmentDetails
        doctorName="Dr. Johnson"
        specialty="Dermatology"
        dateTime="2024-02-02 02:30 PM"
        patientName="Jane Doe"
        appointmentType="Consultation"
        ratingValue={3}
      />
    );

    const specialtyElement = screen.getByText("Dermatology");
    expect(specialtyElement).toBeInTheDocument();
  });

  test("renders date and time correctly", () => {
    render(
      <AppointmentDetails
        doctorName="Dr. White"
        specialty="Neurology"
        dateTime="2024-02-04 11:15 AM"
        patientName="Alice Doe"
        appointmentType="Check-up"
        ratingValue={4}
      />
    );

    const dateTimeElement = screen.getByText(
      "Date & Time: 2024-02-04 11:15 AM"
    );
    expect(dateTimeElement).toBeInTheDocument();
  });

  test("renders patient name correctly", () => {
    render(
      <AppointmentDetails
        doctorName="Dr. Black"
        specialty="Pediatrics"
        dateTime="2024-02-05 01:30 PM"
        patientName="Eva Doe"
        appointmentType="Vaccination"
        ratingValue={4}
      />
    );

    const patientNameElement = screen.getByText("Patient: Eva Doe");
    expect(patientNameElement).toBeInTheDocument();
  });

  test("renders appointment type correctly", () => {
    render(
      <AppointmentDetails
        doctorName="Dr. Green"
        specialty="Internal Medicine"
        dateTime="2024-02-06 04:00 PM"
        patientName="Alex Doe"
        appointmentType="Lab Test"
        ratingValue={3}
      />
    );

    const appointmentTypeElement = screen.getByText(
      "Appointment type: Lab Test"
    );
    expect(appointmentTypeElement).toBeInTheDocument();
  });

  test("handles missing rating value", () => {
    render(
      <AppointmentDetails
        doctorName="Dr. Yellow"
        specialty="Ophthalmology"
        dateTime="2024-02-07 09:45 AM"
        patientName="Chris Doe"
        appointmentType="Eye Exam"
      />
    );

    const ratingElement = screen.queryByLabelText("Rating");
    expect(ratingElement).toBeNull();
  });

  test("handles missing specialty", () => {
    render(
      <AppointmentDetails
        doctorName="Dr. Purple"
        dateTime="2024-02-08 12:30 PM"
        patientName="Sam Doe"
        appointmentType="General Check-up"
        ratingValue={2}
      />
    );

    const specialtyElement = screen.queryByText("Specialty");
    expect(specialtyElement).toBeNull();
  });

  test("handles missing date and time", () => {
    render(
      <AppointmentDetails
        doctorName="Dr. Pink"
        specialty="Dentistry"
        patientName="Tom Doe"
        appointmentType="Dental Cleaning"
        ratingValue={5}
      />
    );

    const dateTimeElement = screen.queryByText("Date & Time");
    expect(dateTimeElement).toBeNull();
  });

  test("handles missing patient name", () => {
    render(
      <AppointmentDetails
        doctorName="Dr. Gray"
        specialty="Rheumatology"
        dateTime="2024-02-10 05:30 PM"
        appointmentType="Joint Pain Consultation"
        ratingValue={4}
      />
    );

    const patientNameElement = screen.queryByText("Patient");
    expect(patientNameElement).toBeNull();
  });

  test("handles missing appointment type", () => {
    render(
      <AppointmentDetails
        doctorName="Dr. Red"
        specialty="Psychiatry"
        dateTime="2024-02-11 11:00 AM"
        patientName="Mary Doe"
        ratingValue={3}
      />
    );

    const appointmentTypeElement = screen.queryByText("Appointment type");
    expect(appointmentTypeElement).toBeNull();
  });
});
