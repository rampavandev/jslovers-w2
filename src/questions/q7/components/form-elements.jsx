import React from "react";

const TextField = ({ name, label, required, onChange, type }) => {
  const handleBlur = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="inputContainer">
      <label htmlFor={name}>
        {label}
        {required && <span>*</span>}
      </label>

      <input
        type={type}
        name={name}
        onChange={onChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

const Checkbox = ({ name, label, required, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.checked);
  };

  return (
    <div className="inputContainer">
      <label htmlFor={name}>
        <input
          type="checkbox"
          name={name}
          onChange={handleChange}
        />
        {label}
        {required && <span>*</span>}
      </label>
    </div>
  );
};

const Radio = ({ name, label, required, options, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="inputContainer">
      <label>
        {label}
        {required && <span>*</span>}
        {options.map((option) => (
          <div className="inputContainer" key={option}>
            <input
              id={option}
              type="radio"
              name={name}
              value={option}
              onChange={handleChange}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </label>
    </div>
  );
};

export { TextField, Checkbox, Radio };
