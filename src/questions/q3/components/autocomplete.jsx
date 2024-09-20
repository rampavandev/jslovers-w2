import React, { useEffect, useState, useCallback } from "react";
import Suggestions from "./suggestions";
import { debounce } from "lodash";

const Autocomplete = ({
  placeholder,
  staticData,
  fetchSuggestions,
  dataKey,
  customLoader = "Loading...",
  onSelect,
  onChange,
  onBlur,
  onFocus,
  customStyles,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  const getSuggestions = async (query) => {
    setError(null);
    setLoading(true);

    try {
      let result;
      if (staticData) {
        result = staticData.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });
      } else if (fetchSuggestions) {
        debugger;
        result = await fetchSuggestions(query);
      }
      setSuggestions(result);
    } catch (error) {
      setError("Error fetching suggestions");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const selectedValue = dataKey ? suggestion[dataKey] : suggestion;
    setInputValue(selectedValue);
    onSelect(suggestion);
    setSuggestions([]);
  };

  const getSuggestionsDebounced = useCallback(
    debounce(getSuggestions, 300),
    []
  );

  useEffect(() => {
    if (inputValue.length > 1) {
      getSuggestionsDebounced(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  return (
    <div className="suggestion-container">
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        style={customStyles}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={(e) => handleInputChange(e)}
      />

      {(suggestions.length > 0 || loading || error) && (
        <ul>
          {error && <div className="error">{error}</div>}
          {loading && <div className="loader">{customLoader}</div>}
          <Suggestions
            dataKey={dataKey}
            highlight={inputValue}
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
          />
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
