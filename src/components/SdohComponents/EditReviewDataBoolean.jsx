// EditReviewDataBoolean.jsx

import React, { useState, useEffect } from "react";
import styles from "../../styles";

const EditReviewDataBoolean = ({ question, category, answer, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState(answer);

  useEffect(() => {
    setEditedAnswer(answer);
  }, [answer]);
  const handleEditClick = () => {
    setIsEditing(true);
    onEdit(question, category, answer); // Include the category when editing
  };

  const handleSaveClick = () => {
    onEdit(question, category, editedAnswer);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedAnswer(answer);
  };

  const handleToggleChange = (key) => {
    setEditedAnswer((prevAnswer) => ({
      ...prevAnswer,
      [key]: !prevAnswer[key],
    }));
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        {isEditing ? (
          <>
            <div
              className={`${styles.textGreen} w-full`}
              style={{ fontSize: "1rem", fontWeight: "bold" }}
            >
              {question}
            </div>
            <div
              className={`${styles.text2xl} ${styles.textGray500} px-2 w-full`}
            >
              {Object.entries(editedAnswer).map(([key, value]) => (
                <div key={key}>
                  <label>
                    {key}:
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleToggleChange(key)}
                    />
                  </label>
                </div>
              ))}
            </div>
            <div className="flex">
              <button
                onClick={handleSaveClick}
                className={`text-green-800 px-4 py-2 mr-2`}
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className={`text-red-600 px-4 py-2`}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              className={`${styles.textGreen800} px-2 mb-1 w-full`}
              style={{ fontSize: "1rem", fontWeight: "bold" }}
            >
              {question}
            </div>
            <button
              onClick={handleEditClick}
              className={`${styles.text2xl} border border-green-500 rounded-full px-3 py-1 mt-[-3] ml-auto`}
              style={{ flexShrink: 0 }}
            >
              Edit
            </button>
            <div
              className={`${styles.text2xl} ${styles.textGray200} px-2 w-full `}
              style={{ borderBottom: "2px solid #ccc" }}
            >
              {Object.entries(answer).map(([key, value]) => (
                <div key={key}>
                  {key}: {value.toString()}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditReviewDataBoolean;
