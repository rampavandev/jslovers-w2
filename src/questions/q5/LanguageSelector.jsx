import React from "react";

const LanguageSelector = ({ onChangeLanguage }) => {
  return (
    <select
      onChange={(e) => onChangeLanguage(e.target.value)}
      className="language-selector"
    >
      <option value="en">English</option>
      <option value="hi">हिन्दी</option>
      <option value="pa">ਪੰਜਾਬੀ</option>
    </select>
  );
};

export default LanguageSelector;
