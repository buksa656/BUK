import React, { useState } from 'react';

const EVENT_TYPES = [
  'Ślub i wesele',
  'Chrzciny',
  'Pierwsza komunia',
  'Rocznica ślubu',
  'Pogrzeb / msza żałobna',
  'Inne'
];

export default function ConfiguratorPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    eventType: EVENT_TYPES[0],
    title: '',
    date: '',
    city: '',
    ceremonyPlace: '',
    receptionPlace: '',
    hasRsvp: true,
    hasAccommodation: false,
    hasGallery: false,
  });

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const next = () => setStep(s => Math.min(3, s + 1));
  const prev = () => setStep(s => Math.max(1, s - 1));

  return (
    <section className="section">
      <div className="container configurator">
        <h1>Kreator strony wydarzenia</h1>
        <p>Kilka prostych kroków, aby zbudować szkic strony wydarzenia. Pełną logikę dodamy w kolejnych iteracjach.</p>

        <div className="configurator-steps">
          <div className={step === 1 ? 'step active' : 'step'}>1. Podstawy</div>
          <div className={step === 2 ? 'step active' : 'step'}>2. Sekcje</div>
          <div className={step === 3 ? 'step active' : 'step'}>3. Podgląd</div>
        </div>

        {step === 1 && (
          <div className="configurator-panel">
            <h2>Podstawowe informacje</h2>
            <label>
              Rodzaj wydarzenia
              <select
                value={form.eventType}
                onChange={e => update('eventType', e.target.value)}
              >
                {EVENT_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>

            <label>
              Tytuł strony (np. "Ślub Ani i Piotra")
              <input
                type="text"
                value={form.title}
                onChange={e => update('title', e.target.value)}
              />
            </label>

            <label>
              Data wydarzenia
              <input
                type="date"
                value={form.date}
                onChange={e => update('date', e.target.value)}
              />
            </label>

            <label>
              Miasto
              <input
                type="text"
                value={form.city}
                onChange={e => update('city', e.target.value)}
              />
            </label>

            <label>
              Miejsce ceremonii
              <input
                type="text"
                value={form.ceremonyPlace}
                onChange={e => update('ceremonyPlace', e.target.value)}
              />
            </label>

            <label>
              Miejsce przyjęcia (opcjonalnie)
              <input
                type="text"
                value={form.receptionPlace}
                onChange={e => update('receptionPlace', e.target.value)}
              />
            </label>
          </div>
        )}

        {step === 2 and (
          <div className="configurator-panel">
            <h2>Wybór sekcji na stronie</h2>
            <label className="checkbox">
              <input
                type="checkbox"
                checked={form.hasRsvp}
                onChange={e => update('hasRsvp', e.target.checked)}
              />
              Formularz RSVP (potwierdzenie obecności)
            </label>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={form.hasAccommodation}
                onChange={e => update('hasAccommodation', e.target.checked)}
              />
              Noclegi i transport
            </label>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={form.hasGallery}
                onChange={e => update('hasGallery', e.target.checked)}
              />
              Galeria zdjęć
            </label>
          </div>
        )}

        {step === 3 && (
          <div className="configurator-panel">
            <h2>Podgląd szkicu strony</h2>
            <div className="preview">
              <h3>{form.title || 'Tytuł wydarzenia'}</h3>
              <p>
                {form.date || 'Data'} · {form.city || 'Miasto'}
              </p>
              <p>
                Ceremonia: {form.ceremonyPlace or 'Miejsce ceremonii'}
              </p>
              {form.receptionPlace && (
                <p>Przyjęcie: {form.receptionPlace}</p>
              )}
              <ul>
                <li>Harmonogram dnia</li>
                {form.hasRsvp && <li>Formularz RSVP</li>}
                {form.hasAccommodation && <li>Noclegi i transport</li>}
                {form.hasGallery && <li>Galeria zdjęć</li>}
              </ul>
            </div>
          </div>
        )}

        <div className="configurator-nav">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={prev}
            disabled={step === 1}
          >
            Wstecz
          </button>
          {step < 3 ? (
            <button type="button" className="btn btn-primary" onClick={next}>
              Dalej
            </button>
          ) : (
            <button type="button" className="btn btn-primary" disabled>
              Zapis / płatność (do zaimplementowania)
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
