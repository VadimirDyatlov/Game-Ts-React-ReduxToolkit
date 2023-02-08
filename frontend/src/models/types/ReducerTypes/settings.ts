export interface IPlayerStats {
  gamesPlayed?: string,
  killings?: string,
  gold?: string,
  time?: string,
}

export interface IInitialState {
  playerStats: IPlayerStats,
  error: boolean | string;
  status: null | string;
}
