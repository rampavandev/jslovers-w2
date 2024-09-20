### **Question: Implement an Autocomplete Component**

**Description:**

You are tasked with building an **Autocomplete** component in React that fetches suggestions from an API as the user types. The component should meet the following requirements:

1. **Input Field**: 
   - The user should be able to type in the input field, and after typing at least 2 characters, the component should fetch and display suggestions.
   
2. **Fetching Suggestions**:
   - If static data is provided, filter suggestions locally. If not, fetch suggestions from an API using the provided `fetchSuggestions` function.

3. **Debouncing**:
   - Debounce the API calls or filtering to avoid unnecessary requests while the user is typing.

4. **Keyboard Navigation**:
   - The user should be able to navigate the list of suggestions using the **ArrowUp** and **ArrowDown** keys.
   - The **Enter** key should allow the user to select the highlighted suggestion.
   - Pressing the **Escape** key should close the suggestions dropdown.

5. **Click to Select**:
   - The user should be able to select a suggestion by clicking on it.

6. **Close on Outside Click**:
   - The suggestions dropdown should close if the user clicks outside the autocomplete component.

7. **Error Handling**:
   - If there is an error fetching suggestions, display an error message to the user.

**Bonus**:
- Highlight the portion of the suggestion that matches the user’s input.

**Props**:

The component should accept the following props:
- `placeholder` (string): Placeholder text for the input.
- `staticData` (array of strings): A static list of suggestions (optional).
- `fetchSuggestions` (function): An asynchronous function to fetch suggestions based on the input (optional if `staticData` is provided).
- `dataKey` (string): The key in the suggestion object to display in the dropdown (for suggestions that are objects).
- `onSelect` (function): Callback when a suggestion is selected.
- `onChange` (function): Callback when the input value changes.
- `onBlur` (function): Callback when the input loses focus.
- `onFocus` (function): Callback when the input gains focus.
- `customLoader` (ReactNode): Custom loader to display while fetching suggestions.

**Example Input:**

```jsx
<Autocomplete
  placeholder="Search for a recipe..."
  fetchSuggestions={async (query) => {
    const response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
    const data = await response.json();
    return data.recipes;
  }}
  dataKey="name"
  onSelect={(selected) => console.log("Selected:", selected)}
  onChange={(searchText) => console.log("Search Text:", searchText)}
  customLoader={<div>Loading...</div>}
/>
```

**Expected Behavior**:
- The suggestions should appear as the user types in the input field.
- Suggestions should be selectable using the mouse or keyboard.
- Clicking outside the autocomplete component should close the suggestions dropdown.

**Constraints**:
- Use only functional components and React hooks (`useState`, `useEffect`, etc.).
- Implement debouncing manually or use a library like `lodash.debounce`.
