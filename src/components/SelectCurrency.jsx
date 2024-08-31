import React, { useState, useEffect, useRef } from "react";
import { initialItems } from "./initialItems";

const SelectCurrency = ({ onSelect }) => {
  
  const loadFavoriteCodes = () => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  };

  const loadItems = () => {
    const favoriteCodes = loadFavoriteCodes();
    return initialItems
      .map((item) => ({
        ...item,
        isFavorite: favoriteCodes.includes(item.code),
      }))
      .sort((a, b) => b.isFavorite - a.isFavorite);
  };

  const [items, setItems] = useState(loadItems);
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  const saveFavoritesToLocalStorage = (items) => {
    const favoriteCodes = items
      .filter(item => item.isFavorite)
      .map(item => item.code);
    localStorage.setItem("favorites", JSON.stringify(favoriteCodes));
  };

  useEffect(() => {
    saveFavoritesToLocalStorage(items);
  }, [items]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (id) => {
    const selected = items.find((item) => item.id === id);
    setSelectedItem(selected);
    setIsOpen(false);

    if (onSelect) {
      onSelect(selected);
    }
  };

  const handleFavorite = (id) => {
    setItems((prevItems) => {
      const sortedItems = prevItems.sort((a, b) => b.isFavorite - a.isFavorite);

      const updatedItems = sortedItems.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      );

      return updatedItems;
    });

    setFilteredItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      ).sort((a, b) => b.isFavorite - a.isFavorite)
    );
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
    setSearchTerm("");
    setFilteredItems(items); 
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
    <div className="select-container" ref={containerRef}>
      <div className="select-currency" onClick={handleClick}>
        {selectedItem ? (
          selectedItem.text
        ) : (
          <i className="placeholder-text">Выберите валюту для конвертации (по умолчанию BYN→USD)</i>
        )}
      </div>
      {isOpen && (
        <div className="options-currency">
          <input
            type="text"
            className="search-input"
            placeholder="Поиск валюты..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
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
