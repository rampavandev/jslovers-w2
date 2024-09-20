### Problem Statement: Bucket List Application

**Objective:**
Create a "Bucket List" application using React that allows users to manage their personal bucket list items. The application should support creating, reading, updating, and deleting (CRUD) items, and leverage `localStorage` to persist data across page reloads.

### Requirements:
1. **Add Items**: Users should be able to add new items to their bucket list. Each item should have a unique ID and a default state of not completed.
2. **Mark as Complete**: Users should be able to mark items as complete using a "Complete" button. The text of completed items should have a strikethrough to indicate their completion, and the "Complete" button should toggle to "Undo" for reversing the completion.
3. **Edit Items**: Users should be able to edit the text of any item by clicking an "Edit" button next to the item. Once clicked, the item should become editable, and the changes should be saved on pressing the Enter key or clicking outside the input field.
4. **Delete Items**: Users should be able to remove items from their list by clicking a "Delete" button next to the respective item.
5. **Persistent Storage**: The application should use `localStorage` to save the bucket list items. When the page is reloaded, the list should remain intact, retrieving the saved data from `localStorage`.
6. **Consistent UI**:
   - All buttons ("Complete", "Edit", "Delete") should have a consistent width and styling.
   - The strikethrough effect should apply only to the text of completed items, not the buttons.

### Constraints:
- Items should have a unique ID.
- The text of items should be editable only when the "Edit" button is clicked.
- The application must use React's `useState` and `useEffect` hooks for state management and lifecycle effects.
- Items should be stored in and retrieved from `localStorage` to ensure persistence across page reloads.
- The design should follow good UI/UX practices, ensuring buttons are intuitive and easy to use.

### Expected Functionality:
1. Users can add new items to their bucket list by typing in an input field and clicking the "Add" button.
2. Users can mark an item as complete by clicking the "Complete" button, which toggles to "Undo" to unmark the item.
3. Users can click the "Edit" button to modify an existing item's text, and the changes are saved when the user presses Enter or clicks outside the input field.
4. Users can delete items from the list by clicking the "Delete" button.
5. The bucket list data is saved in the browser's `localStorage` so that the list persists when the page is refreshed.


### Problem Statement: Bucket List Application