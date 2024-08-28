import React, { useState, useEffect } from "react";
import { initialItems } from "./initialItems";

const SelectCurrency = ({ onSelect }) => {
  const loadItems = () => {
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : initialItems;
  };

  const [items, setItems] = useState(loadItems);
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleSelect = (id) => {
    const selected = items.find((item) => item.id === id);
    setSelectedItem(selected);
    setIsOpen(false);
    setSearchMode(false);

    if (onSelect) {
      onSelect(selected);
    }
  };

  const handleFavorite = (id) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      );
      return updatedItems.sort((a, b) => b.isFavorite - a.isFavorite);
    });

    setFilteredItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
        )
        .sort((a, b) => b.isFavorite - a.isFavorite)
    );
  };

  const handleDoubleClick = () => {
    setSearchMode(true);
    setIsOpen(true);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      setFilteredItems(
        items.filter((item) =>
          item.text.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredItems(items);
    }
  };

  return (
    <div className="select-container">
      <div
        className="select-currency"
        onClick={() => setIsOpen(!isOpen)}
        onDoubleClick={handleDoubleClick}
      >
        {selectedItem ? (
          selectedItem.text
        ) : (
          <i className="placeholder-text">Выберите валюту для конвертации (по умолчанию BYN→USD)</i>
        )}
      </div>
      {isOpen && (
        <div className="options-currency">
          {searchMode && (
            <input
              type="text"
              className="search-input"
              placeholder="Поиск валюты..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          )}
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className={`option-currency ${
                  selectedItem && selectedItem.id === item.id ? "selected" : ""
                }`}
                onClick={() => handleSelect(item.id)}
              >
                <span>{item.text}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(item.id);
                  }}
                  className="favorite-button"
                >
                  {item.isFavorite ? "⭐" : "☆"}
                </button>
              </div>
            ))
          ) : (
            <div className="no-results">
              <span className="no-results-text">⨷ Не найдено</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { SelectCurrency };
