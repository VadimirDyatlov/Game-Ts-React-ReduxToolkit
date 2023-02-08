import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { getPlayersStats } from '../store/reducers/statisticsReducer';
import { formatTime } from '../models/functions';
import H1 from '../components/reused/H1';
import Th from '../components/reused/Th';
import Tr from '../components/statistics/Tr';
import BackButton from '../components/reused/BackButton';
import Loading from '../components/reused/Loading';

function Statistics() {
  const { user, status } = useAppSelector((state) => state.auth);
  const { playerStats, status: statusStats } = useAppSelector((state) => state.statistics);
  const [key, setKey] = useState('gamesPlayed');
  const [countIndex, setcountIndex] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPlayersStats());
  }, []);

  const handleClickSortStats = () => {
    const arr = ['killings', 'gold', 'time', 'gamesPlayed'];
    const maxIndex = arr.length - 1;
    setKey(arr[countIndex]);
    setcountIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  return (
    <>
      {(status === 'loading' || statusStats === 'loading' || status === null) ? <Loading />
        : (
          <>
            {user.name
              ? (
                <>
                  <div className="statistics-box nes-container is-rounded is-dark">
                    <H1 rightText="TOP" leftText="PLAY!" />
                    <hr />
                    <table>
                      <thead>
                        <tr>
                          <Th content="№" />
                          <Th content="Имя" />
                          <Th content="Игр" />
                          <Th content="Убийств" />
                          <Th content="Золото" />
                          <Th content="Время" />
                        </tr>
                      </thead>
                    </table>
                    <div>
                      <table>
                        <tbody>
                          {[...playerStats].sort((a: any, b: any) => b[key] - a[key]) // убрать any
                            .map((player, i) => (
                              <Tr key={player.time} i={i} player={player} formatTime={formatTime} />
                            ))}
                        </tbody>
                      </table>
                    </div>
                    <button className="nes-btn" onClick={handleClickSortStats} type="button">
                      {key}
                    </button>
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

export default Statistics;
