import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="section">
      <div className="container">
        <h1>404 — Nie znaleziono strony</h1>
        <p>Ta ścieżka nie istnieje. Wróć na stronę główną lub do konfiguratora.</p>
        <div className="notfound-actions">
          <Link to="/" className="btn btn-secondary">Strona główna</Link>
          <Link to="/konfigurator" className="btn btn-primary">Kreator</Link>
        </div>
      </div>
    </section>
  );
}
