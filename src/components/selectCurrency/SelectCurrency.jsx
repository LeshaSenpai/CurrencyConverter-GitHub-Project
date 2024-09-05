import React, { useState, useEffect, useRef, useContext } from "react";
import { initialItems } from "../initialItems";
import { CurrencyContext } from "../../contexts/CurrencyContext";
import { getFavorite } from "../../api/CurrencyApi";

const SelectCurrency = ({ onSelect, defaultCurrency }) => {
  const { favorite, setFavorite } = useContext(CurrencyContext);

  const loadItems = () => {
    const favoriteCodes = getFavorite();
    return initialItems
      .map((item) => ({
        ...item,
        isFavorite: favoriteCodes.includes(item.code),
      }))
      .sort((a, b) => b.isFavorite - a.isFavorite);
  };

  const [items, setItems] = useState(() => loadItems());
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const updatedFavorites = items
      .filter(item => item.isFavorite)
      .map(item => item.code);
    setFavorite(updatedFavorites);
  }, [items, setFavorite]);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  useEffect(() => {
    if (defaultCurrency) {
      const defaultItem = items.find(item => item.code === defaultCurrency);
      if (defaultItem) {
        setSelectedItem(defaultItem);
        if (onSelect) {
          onSelect(defaultItem);
        }
      }
    }
  }, [defaultCurrency, items, onSelect]);

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

  const handleSelect = (currencyCode) => {
    const selected = items.find((item) => item.code === currencyCode);
    setSelectedItem(selected);
    setIsOpen(false);

    if (onSelect) {
      onSelect(selected);
    }
  };

  const handleFavorite = (currencyCode) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.code === currencyCode ? { ...item, isFavorite: !item.isFavorite } : item
      );

      return updatedItems.sort((a, b) => b.isFavorite - a.isFavorite);
    });

    setFilteredItems((prevItems) =>
      prevItems
        .map((item) =>
          item.code === currencyCode ? { ...item, isFavorite: !item.isFavorite } : item
        )
        .sort((a, b) => b.isFavorite - a.isFavorite)
    );
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm("");
      setFilteredItems(items);
    }
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
          <i className="placeholder-text">Выберите валюту для конвертации</i>
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
                key={item.code}
                className={`option-currency ${
                  selectedItem && selectedItem.code === item.code ? "selected" : ""
                }`}
                onClick={() => handleSelect(item.code)}
              >
                <span>{item.text}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(item.code);
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
