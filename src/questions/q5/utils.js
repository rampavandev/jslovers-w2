export const translateWithPlaceholders = (string, placeholders = {}) => {
  return string.replace(/{(.*?)}/g, (_, key) => placeholders[key] || `{${key}}`);
};