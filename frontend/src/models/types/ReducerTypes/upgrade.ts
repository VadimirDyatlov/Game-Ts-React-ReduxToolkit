export interface IGetHero {
  type: number,
  hp: number,
  speed: number,
  damage: number,
  lvl: number,
}

export interface ISkills {
  hp: null | number,
  damage: null | number,
  speed: null | number,
  lvl: null | number,
  type: null | number,
}

export interface ISendUpgradeSkills {
  skills: ISkills,
   gold: number | null
}

export interface IConstObj {
  hpUpdateArray: number[],
  damageUpdateArray: number[],
  speedUpdateArray: number[],
  hpStartPrice: number,
  damageStartPrice: number,
  speedStartPrice: number,
  hpPriceCoefficient: number,
  damagePriceCoefficient: number,
  speedPriceCoefficient: number,
}

export interface IUpgradeHeroValue {
  hp: null | number,
  damage: null | number,
  speed: null | number,
  lvl: null | number,
  type: null | number,
}

export interface IInitialState {
  upSkillsСonstants: IConstObj;
  UpgradeGold: null | number;
  UpgradeHeroValue: IUpgradeHeroValue;
  error: boolean | string,
  status: null | string,
}
