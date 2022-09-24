import React, { useState } from "react";

export default function Header(props) {
  const btmBurger = React.useRef();
  const menu = React.useRef();

  const [isBurgerEnable, setIsBurgerEnable] = useState(false);

  const handleBurgerClick = () => {
    btmBurger.current.classList.toggle("active");
    menu.current.classList.toggle("active");
  };

  React.useEffect(() => {
    if (props.children.length > 1) setIsBurgerEnable(true);
  }, []);

  return isBurgerEnable ? (
    <header className="header header_style_burger">
      <div className="header__container header__container_style_burger">
        <a href="#" className="header__logo body__button-hover"></a>
        <div
          className="burger-button body__button-hover"
          ref={btmBurger}
          onClick={handleBurgerClick}
        />
      </div>
      <nav className="navbar" ref={menu}>
        <ul className="navbar__list navbar__list_style_burger">
          {props.children}
        </ul>
      </nav>
    </header>
  ) : (
    <header className="header">
      <div className="header__container">
        <a href="#" className="header__logo body__button-hover"></a>
        <ul className="navbar__list">{props.children}</ul>
      </div>
    </header>
  );
}
