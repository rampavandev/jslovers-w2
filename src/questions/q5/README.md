### **Question:**

You are working on a multilingual web application using React, where translation strings are stored in a `translations` object for different languages (e.g., English, Hindi, Punjabi). The application includes dynamic strings that contain placeholders (e.g., `{name}`). Your goal is to replace these placeholders with actual values when rendering the components.

#### Task:

1. **Update the Utility Function**: Implement a function `translateWithPlaceholders` that:
   - Accepts a translation string containing placeholders (e.g., `Hello, {name}`).
   - Replaces placeholders with the corresponding values from an object passed as the second argument (e.g., `{ name: 'Smile' }`).

2. **Handle Undefined Strings**: Ensure the function handles undefined or null translation strings without causing errors, returning an empty string if the translation string is not provided or not a valid string.

3. **Integrate into the React Component**: In the `RecipeList` component:
   - Display a greeting message using the translation for `greeting`, dynamically replacing `{name}` with a prop value passed as `userName`.
   - Implement fallback logic to handle missing translation keys or strings, ensuring the app does not crash and displays meaningful fallback messages if certain translations are unavailable.
   - Use optional chaining (`?.`) or other techniques to handle potentially undefined fields such as `ingredients` or `steps` in the `translations` object.

4. **Test the Code**: 
   - Write and test your solution to ensure that dynamic translations work correctly for multiple languages (English, Hindi, Punjabi), and placeholder replacement behaves as expected.
   - Ensure that missing translations do not break the app but instead display a fallback message (e.g., "Recipe not found" or "Ingredients not available").

#### Example:
Given the following translation structure:

```javascript
const translations = {
  en: {
    greeting: "Hello, {name}!",
    rajmaChawal: {
      title: "Rajma Chawal",
      ingredientsTitle: "Ingredients",
      stepsTitle: "Steps",
    },
  },
  hi: {
    greeting: "नमस्ते, {name}!",
    rajmaChawal: {
      title: "राजमा चावल",
      ingredientsTitle: "सामग्री",
      stepsTitle: "विधि",
    },
  },
};
```

And a call to the `translateWithPlaceholders` function like this:

```javascript
translateWithPlaceholders(translations['en'].greeting, { name: 'Smile' });
```

The result should be:

```
"Hello, Smile!"
```

If `greeting` is missing or undefined, the function should return an empty string without throwing an error.