import React from "react";
import "./Footer.css";
function Footer() {
    return (React.createElement("footer", { className: "page-footer" },
        React.createElement("div", { className: "footer-content" },
            React.createElement("p", null,
                "\u00A9 ",
                new Date().getFullYear(),
                " Convertes. Not all rights reserved."),
            React.createElement("a", { href: "https://github.com/LeshaSenpai", className: "footer-link" }, "GitHub Link"))));
}
export { Footer };
