import React from 'react';

export default function InfoTooltip(props) {
  const { onClose, message } = props;

  return (
    <div className={`popup popup_visible`}>
      <div className='popup__container popup_info-tooltip'>
        <button
          className='button popup__close body__button-hover'
          type='button'
          aria-label='Закрыть окно'
          onClick={onClose}
        ></button>
        <div className='info-tooltip_container'>
          <div className={`info-tooltip_icon ${message.icon}`}></div>
          <p className='info-tooltip_description'>{message.title}</p>
        </div>
      </div>
    </div>
  );
}
