export const sideStepperHeading =
  "For a prompt completion of your Healthcare details, please upload images of both the front and back of your Identification Information. So you don't have to type in your profile information!";

export const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

export const stateOptions = [
  { label: "Alabama", value: "AL" },
  { label: "California", value: "CA" },
  { label: "Florida", value: "FL" },
  { label: "New York", value: "NY" },
  { label: "Texas", value: "TX" },
];

export const insuranceProviderOptions = [
  { label: "Blue Cross Blue Shield", value: "BCBS" },
  { label: "UnitedHealth Group", value: "UnitedHealth" },
  { label: "Aetna", value: "Aetna" },
  { label: "Cigna", value: "Cigna" },
];

export const creditCardOptions = [
  { label: "Visa", value: "Visa" },
  { label: "MasterCard", value: "MasterCard" },
  { label: "American Express", value: "Amex" },
  { label: "Discover", value: "Discover" },
];

export const creditCardMonthOptions = [
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

export const creditCardYearOptions = [
  { label: "2023", value: "2023" },
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
  { label: "2027", value: "2027" },
  { label: "2028", value: "2028" },
  { label: "2029", value: "2029" },
  { label: "2030", value: "2030" },
];

export const dl_info = {
  firstName: "",
  middleName: "",
  lastName: "",
  zipCode: "",
  stateName: "CA",
  gender: "male",
  address1: "",
  address2: "",
  licenseNumber: "",
  dob: "",
};

export const insurance_info = {
  insuranceProvider: "BCBS",
  bloodGroup: "AB+",
  memberId: "123456789",
  payerId: "Payer_1",
  policyType: "self",
  policyHolderName: "Don R. Daniels",
};

export const creditCard_info = {
  creditCardProvider: "Visa",
  creditCardNumber: "123456789",
  creditCardExpiryMonth: "01",
  creditCardExpiryYear: "2025",
  creditCardHolderName: "John",
};

export const SDOH_Questionnaire = [
  {
    Question: "teeth",
    Radio_button: ["Pale Yellow", "White", "Black"],
    Checkmark: null,
    Dropdown: null,
  },
  {
    Question: "tounge",
    Radio_button: null,
    Checkmark: ["Pale Yellow", "White", "Black"],
    Dropdown: null,
  },
  {
    Question: "tooth decay",
    Radio_button: null,
    Checkmark: null,
    Dropdown: ["Yes", "No"],
  },
  {
    Question: "teeth",
    Radio_button: ["Pale Yellow", "White", "Black"],
    Checkmark: null,
    Dropdown: null,
  },
];

