import React, {useState, useEffect, useRef, useContext} from "react";
import {CurrencyContext} from "../../contexts/CurrencyContext";

const SelectCurrency = ({onSelect, defaultCode}) => {
    const {items, toggleFavorite} = useContext(CurrencyContext);

    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const containerRef = useRef(null);

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

    useEffect(()=>{
        if (filteredItems.length && defaultCode && !selectedItem) {
            handleSelect(defaultCode)
        }
    }, [filteredItems, defaultCode, selectedItem])

    useEffect(() => {
        if (!items || !items.length) {
            return;
        }

        if (!searchTerm) {
            setFilteredItems(items);
        } else {
            setFilteredItems(
                items.filter((item) =>
                    item.text.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, items, setFilteredItems])

    const handleSelect = (code) => {
        const selected = filteredItems.find((item) => item.code === code);
        setSelectedItem(selected);
        setIsOpen(false);

        if (onSelect) {
            onSelect(selected);
        }
    };

    const handleFavorite = (code) => {
        toggleFavorite(code);
    };

    const handleClick = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setSearchTerm("");
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
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

export {SelectCurrency};
