import React from "react";

export default function Footer() {

  const getYear = () => new Date().getFullYear()

  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {getYear()} Mesto Russia</p>
    </footer>
  );
}
