/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import io from 'socket.io-client';
import Loading from '../components/reused/Loading';
import H1 from '../components/reused/H1';
import BackButton from '../components/reused/BackButton';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { getMessageHistory, getNewMessage } from '../store/reducers/chatReducer';
import { setEventMessage } from '../models/types/formEventFuncs';

function Chat() {
  const dispatch = useAppDispatch();
  const [socket] = useState(io('https://js-game-react.onrender.com/'));
  const ref = useRef<HTMLFormElement>(null);
  const { user, status } = useAppSelector((state) => state.auth);
  const { messageHistory } = useAppSelector((state) => state.chat);

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMessage = {
      id: user.id,
      name: user.name,
      message: setEventMessage(event),
    };

    if (ref.current) {
      ref.current.reset();
    }

    socket.emit('message', newMessage);
  };

  useEffect(() => {
    socket.emit('get_message');
    socket.on('send_message', (allMessage) => {
      dispatch(getMessageHistory({ allMessage }));
    });

    socket.on('new-message', (newMessage) => {
      dispatch(getNewMessage({ newMessage }));
    });

    return () => {
      socket.off('connect');
    };
  }, []);

  return (
    <>
      {' '}
      {!messageHistory.length || status === 'loading' || status === null ? <Loading />
        : (
          <>
            {user.name ? (
              <>
                <div className="chat-box nes-container is-rounded is-dark">
                  <H1 rightText="OUR" leftText="COMMUNITY!" />
                  <form ref={ref} onSubmit={handleSendMessage}>
                    <input
                      name="text"
                      className="nes-input"
                      type="text"
                      placeholder="пиши сюда"
                    />
                    <button className="nes-btn" type="submit">Отправить</button>
                  </form>
                  <ul>
                    {[...messageHistory].reverse().map((message) => (
                      <li key={message.id}>
                        {`${message['User.name']}: ${message.message}`}
                      </li>
                    ))}
                  </ul>
                </div>
                <BackButton />
              </>
            )
              : <Navigate to="/" />}
          </>
        )}
    </>
  );
}

export default Chat;
