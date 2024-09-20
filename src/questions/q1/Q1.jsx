import React, { useState, useEffect } from "react";
import "./styles.css";
import { v4 as uuidv4 } from "uuid";

const BucketListApp = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedText, setEditedText] = useState("");

  // Load items from local storage when the component mounts
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("bucketList")) || [];
    setItems(storedItems);
  }, []);

  // Add a new item with a unique ID
  const addItem = () => {
    if (newItem.trim()) {
      const updatedItems = [
        ...items,
        { id: uuidv4(), text: newItem, completed: false },
      ];
      setItems(updatedItems);
      setNewItem("");
      updateLocalStorage(updatedItems);
    }
  };

  // Delete item and update local storage
  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  // Toggle the complete status of an item
  const toggleComplete = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  // Start editing an item
  const startEditing = (id, text) => {
    setEditingItemId(id);
    setEditedText(text);
  };

  // Save the edited item and update local storage
  const saveEdit = (id) => {
    if (editedText.trim()) {
      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, text: editedText } : item
      );
      setItems(updatedItems);
      updateLocalStorage(updatedItems);
      setEditingItemId(null);
    }
  };

  // Update local storage with the current items list
  const updateLocalStorage = (updatedItems) => {
    localStorage.setItem("bucketList", JSON.stringify(updatedItems));
  };

  return (
    <div className="bucket-list-app">
      <h1>My Bucket List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item..."
        />
        <button onClick={addItem}>Add</button>
      </div>
      <ul className="bucket-list">
        {items.map((item) => (
          <li
            key={item.id}
            className={`bucket-list-item ${item.completed ? "completed" : ""}`}
          >
            {editingItemId === item.id ? (
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onBlur={() => saveEdit(item.id)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit(item.id)}
                autoFocus
              />
            ) : (
              <>
                <span className="bucket-list-text">{item.text}</span>
                <div className="btn-group">
                  <button
                    className="complete-btn"
                    onClick={() => toggleComplete(item.id)}
                  >
                    {item.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => startEditing(item.id, item.text)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BucketListApp;
