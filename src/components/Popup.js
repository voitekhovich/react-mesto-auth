import React, { useEffect } from "react";

export default function Popup({ isOpen, name, onClose, children }) {
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen, onClose]);

  return (
    <div
      className={`popup ${isOpen ? "popup_visible" : ""} popup_type_${name}`}
      onClick={handleOverlay}
    >
      <div className={`popup__container popup__container_type_${name}`}>
        <button
          className="button popup__close body__button-hover"
          type="button"
          onClick={onClose}
          aria-label="Закрыть окно"
        />
        {children}
      </div>
    </div>
  );
}
