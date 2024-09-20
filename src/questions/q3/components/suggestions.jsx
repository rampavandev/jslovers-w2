import React from "react";

const SuggestionsList = ({
  suggestions = [],
  highlight,
  dataKey,
  activeSuggestionIndex,
  onSuggestionClick,
}) => {
  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} style={{ fontWeight: "bold" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <React.Fragment>
      {suggestions.map((suggestion, index) => {
        const currentSuggestion = dataKey ? suggestion[dataKey] : suggestion;

        return (
          <li
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className={`suggestion-item ${
              index === activeSuggestionIndex ? "active" : ""
            }`}
            style={{
              backgroundColor:
                index === activeSuggestionIndex ? "#f1f1f1" : "transparent",
            }}
          >
            {getHighlightedText(currentSuggestion, highlight)}
          </li>
        );
      })}
    </React.Fragment>
  );
};

export default SuggestionsList;
