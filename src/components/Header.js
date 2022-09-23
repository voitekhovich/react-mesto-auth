import React from 'react';

export default function Header(props) {

  const burgerHandle = () => {
    const menuElement = document.querySelector('.menu')
    const btnElement = document.querySelector('.btn-toggle')
    menuElement.classList.toggle('menu_hidden');
    btnElement.classList.toggle('active');
  }

  return (
    <header className='header'>
      <a href='#' className='header__logo body__button-hover'></a>
      <div className='btn-toggle' onClick={burgerHandle}></div>
    </header>
  );
}