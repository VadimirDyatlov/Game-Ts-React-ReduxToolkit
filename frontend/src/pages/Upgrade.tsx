import React, { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { getHero } from '../store/reducers/gameReducer';
import {
  getHeroUpgrade, getUserGold, UpgradeHp, UpgradeDamage, UpgradeSpeed, sendUpgradeSkills,
} from '../store/reducers/upgradeReducer';
import BackButton from '../components/reused/BackButton';
import Loading from '../components/reused/Loading';
import H1 from '../components/reused/H1';
import Li from '../components/upgrade/Li';
import { calcUpgrade, radianceNumbers } from '../models/functions';

function Upgrade() {
  const dispatch = useAppDispatch();
  const refHp = useRef<HTMLDivElement>(null);
  const refDamage = useRef<HTMLDivElement>(null);
  const refSpeed = useRef<HTMLDivElement>(null);
  const { user, status } = useAppSelector((state) => state.auth);
  const { hero } = useAppSelector((state) => state.game);
  const {
    UpgradeHeroValue,
    upSkillsСonstants,
    UpgradeGold,
  } = useAppSelector((state) => state.upgrade);

  useEffect(() => {
    dispatch(getHero());
    dispatch(getHeroUpgrade());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserGold({ gold: user.gold }));
  }, [user.gold]);

  const handleClickHpUp = () => {
    dispatch(UpgradeHp(calcUpgrade('up', upSkillsСonstants, UpgradeHeroValue, 'hp', UpgradeGold, refHp)));
  };
  const handleClickHpDown = () => {
    dispatch(UpgradeHp(calcUpgrade('down', upSkillsСonstants, UpgradeHeroValue, 'hp', UpgradeGold, refHp, user.gold, hero)));
  };
  const handleClickDamageUp = () => {
    dispatch(UpgradeDamage(calcUpgrade('up', upSkillsСonstants, UpgradeHeroValue, 'damage', UpgradeGold, refDamage)));
  };
  const handleClickDamageDown = () => {
    dispatch(UpgradeDamage(calcUpgrade('down', upSkillsСonstants, UpgradeHeroValue, 'damage', UpgradeGold, refDamage, user.gold, hero)));
  };
  const handleClickSpeedUp = () => {
    dispatch(UpgradeSpeed(calcUpgrade('up', upSkillsСonstants, UpgradeHeroValue, 'speed', UpgradeGold, refSpeed)));
  };
  const handleClickSpeedDown = () => {
    dispatch(UpgradeSpeed(calcUpgrade('down', upSkillsСonstants, UpgradeHeroValue, 'speed', UpgradeGold, refSpeed, user.gold, hero)));
  };
  const handleClickSendUpgradeSkills = () => {
    if (UpgradeGold !== user.gold) {
      radianceNumbers.call(refHp, 'up');
      radianceNumbers.call(refDamage, 'up');
      radianceNumbers.call(refSpeed, 'up');
      dispatch(sendUpgradeSkills({ skills: UpgradeHeroValue, gold: UpgradeGold }));
    }
  };
  return (
    <>
      {status === 'loading' || status === null ? <Loading />
        : (
          <>
            {user.name
              ? (
                <>
                  <div className="upgrade-box nes-container is-rounded is-dark">
                    <H1 rightText="UPGRADE" leftText="HERO!" />
                    <div>
                      <span>{`Gold ${UpgradeGold}`}</span>
                      <span>Price</span>
                    </div>
                    <ul>
                      <Li
                        skillName="Здоровь"
                        refProp={refHp}
                        skillValue={UpgradeHeroValue.hp}
                        handleClickHpDown={handleClickHpDown}
                        priceValueFunc={() => calcUpgrade('price', upSkillsСonstants, UpgradeHeroValue, 'hp')}
                        handleClickHpUp={handleClickHpUp}
                      />
                      <Li
                        skillName="Урон"
                        refProp={refDamage}
                        skillValue={UpgradeHeroValue.damage}
                        handleClickHpDown={handleClickDamageDown}
                        priceValueFunc={() => calcUpgrade('price', upSkillsСonstants, UpgradeHeroValue, 'damage')}
                        handleClickHpUp={handleClickDamageUp}
                      />
                      <Li
                        skillName="Скорость"
                        refProp={refSpeed}
                        skillValue={UpgradeHeroValue.speed}
                        handleClickHpDown={handleClickSpeedDown}
                        priceValueFunc={() => calcUpgrade('price', upSkillsСonstants, UpgradeHeroValue, 'speed')}
                        handleClickHpUp={handleClickSpeedUp}
                      />
                    </ul>
                    <button className="nes-btn" type="button" onClick={handleClickSendUpgradeSkills}>УЛУЧШИТЬ</button>
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

export default Upgrade;
