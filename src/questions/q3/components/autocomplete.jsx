import React, { useState, useCallback, useEffect, useRef } from "react";
import Suggestions from "./suggestions";
import { debounce } from "lodash";
import { useCache } from "../hooks/use-cache";

const Autocomplete = ({
  placeholder,
  staticData,
  fetchSuggestions,
  dataKey,
  customLoader = "Loading...",
  onSelect,
  onChange,
  customStyles,
  cachingEnabled,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const { setCache, getCache } = useCache("autocompleteCache", 3600);
  const suggestionListRef = useRef(null);

  const getSuggestions = async (query) => {
    setError(null);
    const cachedSuggestions = getCache(query);

    if (cachedSuggestions && cachingEnabled) {
      setSuggestions(cachedSuggestions);
    } else {
      setLoading(true);

      try {
        let result;
        if (staticData) {
          result = staticData.filter((item) =>
            item.toLowerCase().includes(query.toLowerCase())
          );
        } else if (fetchSuggestions) {
          result = await fetchSuggestions(query);
        }
        setCache(query, result);
        setSuggestions(result);
      } catch (error) {
        setError("Error fetching suggestions");
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const getSuggestionsDebounced = useCallback(
    debounce(getSuggestions, 300),
    []
  );

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    onChange(value);

    if (value.length > 1) {
      getSuggestionsDebounced(value); // Fetch suggestions directly when input changes
    } else {
      setSuggestions([]); // Clear suggestions when input is less than 2 characters
      setActiveSuggestionIndex(-1); // Reset the active suggestion index
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const selectedValue = dataKey ? suggestion[dataKey] : suggestion;
    setInputValue(selectedValue);
    onSelect(suggestion);
    setSuggestions([]); // Clear suggestions when an item is selected
    setActiveSuggestionIndex(-1); // Reset the active suggestion index
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      // Move down the suggestions
      setActiveSuggestionIndex((prevIndex) => {
        const newIndex = Math.min(prevIndex + 1, suggestions.length - 1);
        scrollIntoView(newIndex);
        return newIndex;
      });
    } else if (event.key === "ArrowUp") {
      // Move up the suggestions
      setActiveSuggestionIndex((prevIndex) => {
        const newIndex = Math.max(prevIndex - 1, 0);
        scrollIntoView(newIndex);
        return newIndex;
      });
    } else if (event.key === "Enter" && activeSuggestionIndex >= 0) {
      // Select the currently highlighted suggestion
      handleSuggestionClick(suggestions[activeSuggestionIndex]);
    } else if (event.key === "Escape") {
      // Close suggestions on escape key press
      setSuggestions([]);
      setActiveSuggestionIndex(-1);
    }
  };

  const scrollIntoView = (index) => {
    if (suggestionListRef.current) {
      const suggestionItem = suggestionListRef.current.children[index];
      suggestionItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".suggestion-container") === null) {
        setSuggestions([]);
        setActiveSuggestionIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="suggestion-container">
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        style={customStyles}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // Handle keyboard navigation
      />

      {(suggestions.length > 0 || loading || error) && (
        <ul ref={suggestionListRef}>
          {error && <div className="error">{error}</div>}
          {loading && <div className="loader">{customLoader}</div>}
          <Suggestions
            dataKey={dataKey}
            highlight={inputValue}
            suggestions={suggestions}
            activeSuggestionIndex={activeSuggestionIndex} // Pass the active index to Suggestions
            onSuggestionClick={handleSuggestionClick}
          />
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
