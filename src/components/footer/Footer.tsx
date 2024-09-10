import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="page-footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Convertes. Not all rights reserved.</p>
        <a href="https://github.com/LeshaSenpai" className="footer-link">
          GitHub Link
        </a>
      </div>
    </footer>
  );
}

export { Footer };
