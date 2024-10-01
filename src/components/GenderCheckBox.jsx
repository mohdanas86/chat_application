import React from "react";

const GenderCheckBox = ({ onCheckBoxChange, selectGender }) => {
  return (
    <div className="flex justify-start items-start gap-2">
      <div className="form-control">
        <label
          className={`label cursor-pointer gap-2 ${
            selectGender === "male" ? "selected" : ""
          }`}
        >
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox"
            name="gender"
            checked={selectGender === "male"}
            onChange={() => onCheckBoxChange("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label cursor-pointer gap-2 ${
            selectGender === "male" ? "selected" : ""
          }`}
        >
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox"
            name="gender"
            checked={selectGender === "female"}
            onChange={() => onCheckBoxChange("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckBox;
