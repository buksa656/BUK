import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="section hero" id="home">
        <div className="container hero-inner">
          <div>
            <h1>Strony internetowe na Twoje rodzinne wydarzenia</h1>
            <p>
              FIFO to prosty kreator stron na ślub, chrzciny, komunię, rocznicę czy pogrzeb.
              Wszystkie informacje dla gości w jednym, czytelnym miejscu.
            </p>
            <div className="hero-actions">
              <Link to="/konfigurator" className="btn btn-primary">Rozpocznij konfigurację</Link>
              <a href="#przyklad" className="btn btn-secondary">Zobacz jak wygląda strona wydarzenia</a>
            </div>
          </div>
          <div className="hero-preview">
            <div className="hero-card">
              <p className="hero-tag">Przykładowa strona ślubna</p>
              <h2>Ślub Ani i Piotra</h2>
              <p>12 lipca 2027 · Gdańsk</p>
              <p>Ceremonia · Przyjęcie · RSVP · Dojazd · Noclegi</p>
            </div>
          </div>
        </div>
      </section>

      {/* DLA KOGO */}
      <section className="section" id="typy-wydarzen">
        <div className="container">
          <h2>Dla jakich wydarzeń?</h2>
          <div className="grid grid-3">
            <div className="card">
              <h3>Ślub i wesele</h3>
              <p>Strona ślubna z harmonogramem, listą prezentów, noclegami i formularzem RSVP.</p>
            </div>
            <div className="card">
              <h3>Chrzciny i komunia</h3>
              <p>Czytelne zaproszenie z informacją o ceremonii, przyjęciu i prośbami do gości.</p>
            </div>
            <div className="card">
              <h3>Pogrzeb i msza żałobna</h3>
              <p>Spokojna, prosta strona z informacją o pożegnaniu, dojeździe i wspomnieniem o bliskiej osobie.</p>
            </div>
          </div>
        </div>
      </section>

      {/* JAK TO DZIAŁA */}
      <section className="section section-alt" id="jak-to-dziala">
        <div className="container">
          <h2>Jak to działa?</h2>
          <ol className="steps">
            <li>Wybierasz rodzaj wydarzenia i szablon.</li>
            <li>Uzupełniasz informacje: data, miejsce, harmonogram, praktyczne wskazówki.</li>
            <li>Włączasz potrzebne moduły: RSVP, mapa, noclegi, galeria.</li>
            <li>Opłacasz, publikujesz stronę i wysyłasz gościom link oraz kod QR.</li>
          </ol>
        </div>
      </section>

      {/* SZABLONY */}
      <section className="section" id="szablony">
        <div className="container">
          <h2>Gotowe szablony</h2>
          <p>Na start przygotowaliśmy kilka szablonów dopasowanych do najpopularniejszych uroczystości.</p>
          <div className="grid grid-3">
            <div className="card">
              <h3>Klasyczny ślub</h3>
              <p>Elegancki, czytelny układ z naciskiem na harmonogram i informacje praktyczne.</p>
            </div>
            <div className="card">
              <h3>Rodzinne chrzciny</h3>
              <p>Delikatne kolory, proste sekcje o ceremonii i spotkaniu po mszy.</p>
            </div>
            <div className="card">
              <h3>Spokojne pożegnanie</h3>
              <p>Stonowany design, miejsce na informację o ceremonii i wspomnienie o zmarłym.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CENNIK */}
      <section className="section section-alt" id="cennik">
        <div className="container">
          <h2>Proste pakiety cenowe</h2>
          <div className="grid grid-3 pricing-grid">
            <div className="card">
              <h3>Basic</h3>
              <p className="price">od 149 zł</p>
              <ul>
                <li>Strona na jedno wydarzenie</li>
                <li>Podstawowe sekcje: data, miejsce, harmonogram</li>
                <li>Formularz RSVP</li>
              </ul>
            </div>
            <div className="card card-highlight">
              <h3>Standard</h3>
              <p className="price">od 199 zł</p>
              <ul>
                <li>Wszystko z pakietu Basic</li>
                <li>Dodatkowe sekcje: noclegi, galeria, FAQ dla gości</li>
                <li>Strona dostępna przez 12 miesięcy</li>
              </ul>
            </div>
            <div className="card">
              <h3>Premium</h3>
              <p className="price">od 299 zł</p>
              <ul>
                <li>Wszystko z pakietu Standard</li>
                <li>Strona na własnej subdomenie</li>
                <li>Opcjonalne wsparcie w przygotowaniu treści</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container">
          <h2>Najczęstsze pytania</h2>
          <div className="faq-item">
            <h3>Na jak długo jest aktywna strona?</h3>
            <p>Zależnie od pakietu od kilku do kilkunastu miesięcy. Możesz przedłużyć dostęp w dowolnym momencie.</p>
          </div>
          <div className="faq-item">
            <h3>Czy strona jest prywatna?</h3>
            <p>Tak, możesz ustawić stronę na hasło i udostępnić link tylko zaproszonym osobom.</p>
          </div>
          <div className="faq-item">
            <h3>Czy mogę samodzielnie edytować treści?</h3>
            <p>Tak, po publikacji możesz wrócić do konfiguratora i wprowadzić zmiany w treści i sekcjach.</p>
          </div>
        </div>
      </section>

      {/* CTA DOLNE */}
      <section className="section section-cta">
        <div className="container">
          <h2>Gotowy, żeby stworzyć stronę na swoje wydarzenie?</h2>
          <Link to="/konfigurator" className="btn btn-primary">Rozpocznij konfigurację</Link>
        </div>
      </section>
    </>
  );
}
