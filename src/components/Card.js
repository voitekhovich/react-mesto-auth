import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card(props) {

  const {card, onCardClick, onCardLike, onCardDelete } = props;

  const currentUser = React.useContext(CurrentUserContext);

  const isOwner = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const handleClick = () => onCardClick(card);
  const handleClickLike = () => onCardLike(card);
  const handleCardDelete =() => onCardDelete(card);

  const cardDeleteButtonElement = (
    isOwner && (<button className='button element__trash body__button-hover' 
                        type='button' aria-label='Удалить' onClick={handleCardDelete}>
                </button>)
  );
  const cardLikeButtonClassName = (
    `button element__like body__button-hover ${isLiked ? 'element__like_active' : ''}`
  );

  return (
    <React.Fragment>
      <img src={card.link} alt={card.name} className='element__image body__button-hover' onClick={handleClick}/>
      {cardDeleteButtonElement}
      <div className='element__container'>
        <h2 className='element__title body__text-nowrap'>{card.name}</h2>
        <div className='element__likes-container'>
          <button className={cardLikeButtonClassName} type='button' aria-label='Нравится' onClick={handleClickLike}></button>
          <p className='element__likes-count'>{card.likes.length}</p>
        </div>
      </div>
    </React.Fragment>
  );
  
}