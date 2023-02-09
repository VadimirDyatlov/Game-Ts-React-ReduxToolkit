/* eslint-disable import/no-unresolved */
import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/reused/BackButton';
import H1 from '../components/reused/H1';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { getUserSingIn, setError } from '../store/reducers/authReducer';
import { setEventUserSingin } from '../models/types/formEventFuncs';

function Signin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, error } = useAppSelector((state) => state.auth);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      dispatch(getUserSingIn(setEventUserSingin(event)));
    },
    [formRef],
  );

  if (error !== false) {
    setTimeout(() => {
      dispatch(setError());
    }, 6000);
  }

  useEffect(
    () => {
      if (user && user.id) {
        navigate('/');
      }
    },
    [user],
  );

  return (
    <>
      <div className="auth-box nes-container is-rounded is-dark">
        <H1 rightText="WELCOME" leftText="BACK!" />
        <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
          <div className="nes-field">
            <input
              className="nes-input"
              type="text"
              name="name"
              placeholder="name"
              required
            />
          </div>
          <div className="input-section nes-field">
            <input
              className="nes-input"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="nes-btn" id="login-btn">
            Войти
          </button>
          { error !== false && <div className="error-message">{error}</div> }
        </form>
      </div>
      <BackButton />
    </>
  );
}

export default Signin;
