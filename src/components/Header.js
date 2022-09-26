import React from 'react';

export default function Header(props) {
  return (
    <header className='header'>
      <a href='#' className='header__logo body__button-hover'></a>
      <ul className='menu'>
        {props.children}
      </ul>
    </header>
  );
}