export interface IGetHero {
  type: number,
  hp: number,
  speed: number,
  damage: number,
  lvl: number,
}

interface IHeroStats {
  lvl: number,
  type: number,
}

interface IGameStats {
  gameTime: number,
  killings: number,
  gold: number,
}

export interface ISendGameStats {
  heroStats: IHeroStats,
  gameStats: IGameStats,
}

interface IGamePlay {
  waves1: number
  waves1Count: number
  waves2: number
  waves2Count: number
  waves3: number
  waves3Count: number
  boss: number
  bossCount: number
  countWaves: number
  coolDownEnemies: number
  coolDownBullet: number
  droppedGoldType1: number
  droppedGoldType2: number
  droppedGoldType3: number
  droppedGoldType4: number
  lastShoot: number
}

export interface IHero {
  x: number
  y: number
  w: number
  h: number
  hp: number
  lvl: number
  type: number
  damage: number
  speed: number
  move: number
  skin: string
  rateOfFire: number
  corner: number
}

export interface IEnemies {
  id: string
  type: number
  w: number
  h: number
  x: number
  y: number
  hp: number
  speed: number
  damage: number
  coolDown: number
  skin: string
  move: number
  xp: number
  bloodSkin: string
  deadSkin: string
}

export interface IGold {
  id: string
  x: number
  y: number
  h: number
  w: number
  skin: string
  value: number
}

export interface IBaullet {
  id: string
  x: number
  y: number
  w: number
  h: number
  speed?: number
  speedX: number
  speedY: number
  damage: number
  corner: number
  visibility: boolean
}

interface IDisplay {
  width: number
  height: number
}

export interface IBlood {
  id: string
  x: number
  y: number
  w: number
  h: number
  skin: string
  lifetime: number
  move: number
}

export interface IDeadBody {
  id: string
  x: number
  y: number
  w: number
  h: number
  skin: string
  lifetime: number
  move: number
}

export interface IInitialState {
  error: boolean | string
  status: null | string
  gamePlay: IGamePlay
  gameStats: IGameStats
  hero: IHero
  enemiesArray: IEnemies[]
  enemies1: IEnemies
  enemies2: IEnemies
  enemies3: IEnemies
  enemies4: IEnemies
  goldsArray: IGold[]
  gold: IGold
  bulletsArray: IBaullet[]
  bullet: IBaullet
  bloodArray: IBlood[]
  blood: IBlood
  deadBodyArray: IDeadBody[]
  deadBody: IDeadBody
  gameLoop: number
  display: IDisplay
  backgroundPositionLeft: number
  calcEnemiesFlag: boolean,
  calcEnemiesFlag1: boolean,
}
