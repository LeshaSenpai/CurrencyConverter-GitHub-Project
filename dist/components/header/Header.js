import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
function Header() {
    return (React.createElement("div", null,
        React.createElement("nav", { className: "header-nav" },
            React.createElement("div", { className: "nav-wrapper" },
                React.createElement(Link, { to: "/", className: "brand-logo" }, "Converters"),
                React.createElement("ul", { id: "nav-mobile", className: "right" },
                    React.createElement("li", null,
                        React.createElement(Link, { to: "/" }, "\u041A\u043E\u043D\u0432\u0435\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C")),
                    React.createElement("li", null,
                        React.createElement(Link, { to: "/rates" }, "\u041A\u0443\u0440\u0441\u044B")))))));
}
export { Header };
