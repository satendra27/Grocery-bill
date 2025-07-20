import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [menu, setMenu] = useState("Home");

  return (
    <nav>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
        <li>
          <Link
            to="/"
            onClick={() => setMenu("Home")}
            className={menu === "Home" ? "active" : ""}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/Bill"
            onClick={() => setMenu("Generate Bill")}
            className={menu === "Generate Bill" ? "active" : ""}
          >
            Generate Bill
          </Link>
        </li>
      </ul>
    </nav>
  );
};
