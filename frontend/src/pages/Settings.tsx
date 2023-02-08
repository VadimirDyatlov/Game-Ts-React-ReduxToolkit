import React, { useCallback, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { getPlayerStats } from '../store/reducers/settingsReducer';
import { editUserData, setError } from '../store/reducers/authReducer';
import EditProfile from '../components/settings/EditProfile';
import EditAvatar from '../components/settings/EditAvatar';
import BackButton from '../components/reused/BackButton';
import Loading from '../components/reused/Loading';
import { setEventUserSingin } from '../models/types/formEventFuncs';
import PlayerStats from '../components/settings/PlayerStats';

function Settings() {
  const { user, error, status } = useAppSelector((state) => state.auth);
  const { playerStats } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  console.log(playerStats);

  useEffect(() => {
    dispatch(getPlayerStats());
  }, []);

  if (error !== false) {
    setTimeout(() => {
      dispatch(setError());
    }, 6000);
  }

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(editUserData(setEventUserSingin(event)));
    },
    [formRef],
  );

  return (
    <>
      {(status === 'loading' || status === null) ? <Loading />
        : (
          <>
            {user.name
              ? (
                <>
                  <div className="settings-box">
                    <div className="settings-container-1">
                      <EditProfile
                        name={user.name}
                        error={error}
                        formRef={formRef}
                        handleSubmit={handleSubmit}
                      />
                      <EditAvatar ifAvatar={user.avatar} name={user.name} />
                    </div>
                    <PlayerStats playerStats={playerStats} />
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

export default Settings;
