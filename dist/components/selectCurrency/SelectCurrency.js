import React, { useState, useEffect, useRef, useContext } from "react";
import { CurrencyContext } from "../../contexts/CurrencyContext";
const SelectCurrency = ({ onSelect, defaultCode }) => {
    const { items, toggleFavorite } = useContext(CurrencyContext);
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
    useEffect(() => {
        if (filteredItems.length && defaultCode && !selectedItem) {
            handleSelect(defaultCode);
        }
    }, [filteredItems, defaultCode, selectedItem]);
    useEffect(() => {
        if (!items || !items.length) {
            return;
        }
        if (!searchTerm) {
            setFilteredItems(items);
        }
        else {
            setFilteredItems(items.filter((item) => item.text.toLowerCase().includes(searchTerm.toLowerCase())));
        }
    }, [searchTerm, items, setFilteredItems]);
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
    return (React.createElement("div", { className: "select-container", ref: containerRef },
        React.createElement("div", { className: "select-currency", onClick: handleClick }, selectedItem ? (selectedItem.text) : (React.createElement("i", { className: "placeholder-text" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0430\u043B\u044E\u0442\u0443 \u0434\u043B\u044F \u043A\u043E\u043D\u0432\u0435\u0440\u0442\u0430\u0446\u0438\u0438"))),
        isOpen && (React.createElement("div", { className: "options-currency" },
            React.createElement("input", { type: "text", className: "search-input", placeholder: "\u041F\u043E\u0438\u0441\u043A \u0432\u0430\u043B\u044E\u0442\u044B...", value: searchTerm, onChange: handleSearchChange }),
            filteredItems.length > 0 ? (filteredItems.map((item) => (React.createElement("div", { key: item.code, className: `option-currency ${selectedItem && selectedItem.code === item.code ? "selected" : ""}`, onClick: () => handleSelect(item.code) },
                React.createElement("span", null, item.text),
                React.createElement("button", { type: "button", onClick: (e) => {
                        e.stopPropagation();
                        handleFavorite(item.code);
                    }, className: "favorite-button" }, item.isFavorite ? "⭐" : "☆"))))) : (React.createElement("div", { className: "no-results" },
                React.createElement("span", { className: "no-results-text" }, "\u2A37 \u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E")))))));
};
export { SelectCurrency };
