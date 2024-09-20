import React, { useState, useEffect } from "react";
import "./styles.css";
import Autocomplete from "./components/autocomplete";

const SearchUi = () => {
  const staticData = ["Pasta", "Pizza", "Burger", "Sandwich", "Salad"];

  const fetchSuggestions = async (query) => {
    debugger;
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch suggestions");
    }

    const data = await response.json();
    return data.recipes;
  };

  return (
    <div className="container">
      <h1> Typeahead / AutoComplete Component</h1>
      <Autocomplete
        placeholder={"Enter Recipe"}
        fetchSuggestions={fetchSuggestions}
        dataKey={"name"}
        customLoader={<div>Loading...</div>}
        onSelect={(selected) => console.log(selected)}
        onChange={(searchText) => console.log(searchText)}
        onBlur={() => console.log("onBlur")}
        onFocus={() => console.log("onFocus")}
        customStyles={{}}
      />
    </div>
  );
};
export default SearchUi;
