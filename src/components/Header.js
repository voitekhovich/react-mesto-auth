import React from "react";

export default function Header(props) {
  const btmBurger = React.useRef();
  const menu = React.useRef();

  const handleBurgerClick = () => {
    btmBurger.current.classList.toggle("active");
    menu.current.classList.toggle("active");
  };

  return (
    <header className="header">
      <div className="header__container">
        <a href="#" className="header__logo body__button-hover"></a>
        <div
          className="burger-button body__button-hover"
          ref={btmBurger}
          onClick={handleBurgerClick}
        />
      </div>
      <nav className="navbar" ref={menu}>
        <ul className="navbar__list">{props.children}</ul>
      </nav>
    </header>
  );
}
