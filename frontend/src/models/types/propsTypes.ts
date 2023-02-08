/* eslint-disable import/no-unresolved */
import React from 'react';
import { IBaullet, IEnemies, IGold } from './ReducerTypes/game';
import { IPlayerStats } from './ReducerTypes/settings';
import { IPlayersStats } from './ReducerTypes/statistics';

export interface IPropsBullet {
  bullet: IBaullet
}

export interface IPropsEnemy {
  enemy: IEnemies
}

export interface IPropsGameOver {
  playGame: string
}

export interface IPropsCoin {
  coin: IGold
}

export interface IPropsLi {
  path: string
  text: string
  handleClickLogOut?: () => void
}

export interface IPropsH1 {
  rightText: string
  leftText: string
}

export interface IPropsTd {
  content: string | undefined
}

export interface IPropsTh {
  content: string
}

export interface IEditProfile {
  name: string
  error: string | boolean
  formRef: React.RefObject<HTMLFormElement>
  handleSubmit: any // убрать any
}

export interface IEditAvatar {
  ifAvatar?: string
  name: string
}

export interface IPropsPlayerStats {
  playerStats: IPlayerStats
}

export interface IPropsTr {
  i: number
  player: IPlayersStats
  formatTime: Function
}

export interface IPropsLiUp {
  skillName: string
  refProp: React.RefObject<HTMLDivElement>
  skillValue: number | null
  handleClickHpDown: () => void
  priceValueFunc: () => number | 'max' | { [x: string]: number | null | undefined; gold: number | null | undefined; } | null
  handleClickHpUp: () => void
}
