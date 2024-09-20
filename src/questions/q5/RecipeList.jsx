// src/components/RecipeList.js
import React from "react";
import translations from "./translations";

const RecipeList = ({ language }) => {
  const { ingredient, rajmaChawal, steps } = translations[language];

  return (
    <div className="recipe-list">
      <h1>{rajmaChawal.title}</h1>
      <h2>{ingredient}</h2>
      <ul>
        {rajmaChawal.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>{steps}</h2>
      <ol>
        {rajmaChawal.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeList;
