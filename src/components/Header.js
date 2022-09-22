import React from 'react';

export default function Header(props) {
  return (
    <header className="header">
      <a href="#" className="header__logo body__button-hover"></a>
      <ul className='menu'>
        {props.children}
        {/* <li><Link className='menu__link' to={'/signin'}>Войти</Link></li>
        <li><Link className='menu__link' to={'/signup'}>Регистрация</Link></li>
        <li><Link className='menu__link' to={'/signout'}>Выйти</Link></li> */}
      </ul>
    </header>
  );
}