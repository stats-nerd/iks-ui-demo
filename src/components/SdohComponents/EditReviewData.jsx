import React, { useState } from "react";
import styles from "../../styles";

const EditReviewData = ({ question, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState(
    Array.isArray(question.Answer)
      ? question.Answer.join(", ")
      : question.Answer
  );

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(question.Question, editedAnswer);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedAnswer(
      Array.isArray(question.Answer)
        ? question.Answer.join(", ")
        : question.Answer
    );
  };

  const handleAnswerChange = (e) => {
    setEditedAnswer(e.target.value);
  };

  const renderInput = () => {
    if (question.Radio_button) {
      return (
        <select
          value={editedAnswer}
          onChange={handleAnswerChange}
          className={`text-2xl text-gray-500 px-2 w-full max-w-480 border-b-2 border-gray-300`}
        >
          {question.Radio_button.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    } else if (question.Checkbox) {
      return (
        <div>
          {question.Checkbox.map((option, index) => (
            <label key={index} className="flex items-center">
              <input
                type="checkbox"
                value={option}
                checked={editedAnswer.includes(option)}
                onChange={(e) => handleCheckboxChange(e, option)}
              />
              <span className="text-2xl text-gray-500 ml-2">{option}</span>
            </label>
          ))}
        </div>
      );
    } else {
      return (
        <input
          type="text"
          value={editedAnswer}
          onChange={handleAnswerChange}
          className={` text-gray-500 px-2 w-full max-w-480  border-gray-500`}
        />
      );
    }
  };

  const handleCheckboxChange = (e, option) => {
    const isChecked = e.target.checked;
    setEditedAnswer((prevAnswer) => {
      if (isChecked) {
        return Array.isArray(prevAnswer) ? [...prevAnswer, option] : [option];
      } else {
        return Array.isArray(prevAnswer)
          ? prevAnswer.filter((selectedOption) => selectedOption !== option)
          : [];
      }
    });
  };

  const questionColorClass = isEditing
    ? "text-green-500" // Color when editing (green)
    : editedAnswer
    ? "text-green-800"
    : "text-red-600"; // Color based on whether answered or not

  return (
    <div className="flex flex-col">
      <div className="flex flex-col ">
        {isEditing ? (
          <>
            <div className={`${questionColorClass} w-full text-base`}>
              {question.Question}
            </div>
            {renderInput()}
            <div className="flex">
              <button
                onClick={handleSaveClick}
                className={` text-green-800 px-4 py-2 mr-2`}
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className={` text-red-600 px-4 py-2`}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className={`flex items-center`}>
            <div
              className={`${questionColorClass} px-2 mb-1 w-full text-base text-[24px] flex-grow`}
            >
              {question.Question}
            </div>
            <button
              // onClick={handleEditClick}
              onClick={() => {}}
              className={`border border-green-600 text-green-600 rounded px-3 py-1 ml-2`}
            >
              <span>Edit</span>
            </button>
          </div>
        )}
        {!isEditing && (
          <div
            className={`text-gray-100 px-2 w-full border-b-2 border-gray-100`}
          >
            <span className="text-gray-500">{editedAnswer}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditReviewData;
