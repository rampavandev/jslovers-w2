import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import RecipeList from "./RecipeList";
import LanguageSelector from "./LanguageSelector";
import translations from "./translations";
import { translateWithPlaceholders } from "./utils";

const Q5 = () => {
  const [language, setLanguage] = useState("en");
  const { title } = translations[language];

  const handleChangeLanguage = (lng) => {
    setLanguage(lng);
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="header-title">
          {translateWithPlaceholders(title, { name: "Smile" })}
        </h1>
        <LanguageSelector onChangeLanguage={handleChangeLanguage} />
      </header>
      <main className="content">
        <RecipeList language={language} />
      </main>
    </div>
  );
};
export default Q5;
