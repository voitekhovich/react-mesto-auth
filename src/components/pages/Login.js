import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';

export default function Login(props) {
  const [state, setState] = React.useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = React.useState('');

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((old) => ({
      ...old,
      [name]: value,
    }));
  };

  const sendErrorMessage = (mesg) => {
    setMessage(mesg);
    console.log(mesg);
  } 

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onLogin(state.email, state.password).catch((err) => {
      switch (err) {
        case 400:
          sendErrorMessage(`${err} - не передано одно из полей`);
          break;
        case 401:
          sendErrorMessage(`${err} - пользователь с email не найден`);
          break;
        default:
          console.log(err);
      }
    });
  };

  return (
    <React.Fragment>
      <Header>
        <li>
          <Link className='navbar__link body__button-hover' to={'/signup'}>
            Регистрация
          </Link>
        </li>
      </Header>
      <div className='sign'>
        <h2 className='heading heading_theme_dark sign__heading'>Вход</h2>
        <form className='form sign_form' onSubmit={handleSubmit}>
          <fieldset className='form__fieldset sign__fieldset'>
            <input
              className='form__input form__input_type_name form__input_theme_dark'
              id='email'
              name='email'
              type='email'
              placeholder='Email'
              value={state.email || ''}
              onChange={handleChange}
            />

            <input
              className='form__input form__input_type_name form__input_theme_dark'
              id='password'
              name='password'
              type='password'
              placeholder='Пароль'
              value={state.password || ''}
              onChange={handleChange}
            />
            <span className='form__input-error sign__input-error'>{message}</span>
            <button
              type='submit'
              className='button form__submit form__submit_theme_dark sign__submit body__button-hover'
            >
              Войти
            </button>
          </fieldset>
        </form>
      </div>
    </React.Fragment>
  );
}
