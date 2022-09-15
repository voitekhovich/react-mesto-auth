import React from 'react';

import Card from './Card';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main(props) {

  const {onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete} = props;
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-box"> 
          <img src={currentUser.avatar} alt="" className="profile__avatar" />
          <div className="profile__avatar-edit body__button-hover" onClick={onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <div className="profile__name-line">
            <h1 className="profile__name body__text-nowrap">{currentUser.name}</h1>
            <button className="button profile__edit-button body__button-hover" onClick={onEditProfile} type="button"
                    aria-label="Редактировать профиль"></button>
          </div>
          <p className="profile__about body__text-nowrap">{currentUser.about}</p>
        </div>
        <button className="button profile__add-button body__button-hover" onClick={onAddPlace} type="button" aria-label="Добавить место" ></button>
      </section>
      <section aria-label="Блок с карточками">
        <ul className="elements">
        {cards.map((card) => (
          <li className="element" key={card._id} >
            <Card
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete} />
          </li>
        ))}
        </ul>
      </section>
    </main>
  )
  
}