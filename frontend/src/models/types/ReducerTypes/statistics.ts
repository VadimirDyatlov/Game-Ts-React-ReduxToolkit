export interface IPlayersStats {
  ['User.id']: number
  ['User.name']: string
  gamesPlayed: string
  killings: string
  gold: string
  time: number
}

export interface IInitialState {
playerStats: IPlayersStats[];
error: boolean | string;
status: null | string;
}
