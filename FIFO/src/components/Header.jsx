import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">FIFO</Link>
        <nav className="nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>
            Strona główna
          </NavLink>
          <a href="#jak-to-dziala" className="nav-link">Jak to działa</a>
          <a href="#szablony" className="nav-link">Szablony</a>
          <a href="#typy-wydarzen" className="nav-link">Typy wydarzeń</a>
          <a href="#cennik" className="nav-link">Cennik</a>
          <a href="#faq" className="nav-link">FAQ</a>
          <Link to="/konfigurator" className="nav-cta">Rozpocznij konfigurację</Link>
        </nav>
      </div>
    </header>
  );
}
