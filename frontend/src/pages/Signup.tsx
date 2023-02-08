/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// import BackButton from '../components/Reused/r';
// import H1 from '../components/Reused/H1';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { getUserSingUp, setError } from '../store/reducers/authReducer';
import { setEventUserSingup } from '../models/types/formEventFuncs';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, error } = useAppSelector((state) => state.auth);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      dispatch(getUserSingUp(setEventUserSingup(event)));
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
        {/* <H1 rightText="LET&apos;S" leftText="PLAY!" /> */}
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
          <div className="nes-field">
            <input
              className="nes-input"
              type="password"
              name="password"
              placeholder="password"
              required
            />
          </div>
          <div className="nes-field">
            <input
              name="password2"
              required
              className="nes-input"
              type="password"
              placeholder="password confirm"
              style={{ color: 'black' }}
            />
          </div>
          <button type="submit" className="nes-btn is-primary nes-up">
            Войти
          </button>
          { error !== false && <div className="error-message">{error}</div> }
        </form>
      </div>
      123
    </>
  );
}

export default Signup;
