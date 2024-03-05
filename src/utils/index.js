// Customs function

export function reformatDateToYYYYMMDD(inputDate) {
  // Split the input date into day, month, and year
  const [day, month, year] = inputDate.split("/");

  // Create a new Date object with the parsed values
  const originalDate = new Date(`${year}-${month}-${day}`);

  // Check if the date is valid
  if (isNaN(originalDate.getTime())) {
    console.error(
      "Invalid date format. Please provide date in dd/mm/yyyy format."
    );
    return null; // Return null or handle the error as needed
  }

  // Get the reformatted date components
  const reformattedYear = originalDate.getFullYear();
  const reformattedMonth = String(originalDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-indexed
  const reformattedDay = String(originalDate.getDate()).padStart(2, "0");

  // Concatenate the components in the yyyy/mm/dd format
  const reformattedDate = `${reformattedYear}-${reformattedMonth}-${reformattedDay}`;
  console.log(reformattedDate);
  return reformattedDate;
}
