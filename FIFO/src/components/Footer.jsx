import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} FIFO — Strony na wydarzenia rodzinne.</p>
        <p className="footer-small">Śluby, chrzciny, komunie, rocznice, pogrzeby — wszystko w jednym prostym kreatorze.</p>
      </div>
    </footer>
  );
}
