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
}

interface IDisplay {
  width: number
  height: number
}

export interface IInitialState {
  error: boolean | string
  status: null | string
  gamePlay: IGamePlay
  gameStats: IGameStats
  hero: IHero
  enemies: IEnemies[]
  enemies1: IEnemies
  enemies2: IEnemies
  enemies3: IEnemies
  enemies4: IEnemies
  golds: IGold[]
  gold: IGold
  bullets: IBaullet[]
  bullet: IBaullet
  gameLoop: number
  display: IDisplay
  backgroundPositionLeft: number
  calcEnemiesFlag: boolean,
  calcEnemiesFlag1: boolean,
}
