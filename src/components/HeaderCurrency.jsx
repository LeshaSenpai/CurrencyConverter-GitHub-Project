import React from "react";
import { Link } from "react-router-dom";
import "../styles/HeaderStyle.css";

function HeaderCurrency() {
  return (
    <div>
      <nav className="header-nav">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">
            Converters
          </Link>
          <ul id="nav-mobile" className="right">
            <li>
              <Link to="/">Конвертировать</Link>
            </li>
            <li>
              <Link to="/rates">Курсы</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export { HeaderCurrency };
