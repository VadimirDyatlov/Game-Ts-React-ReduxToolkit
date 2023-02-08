/* eslint-disable import/no-unresolved */
import React from 'react';
import { IEventUserSingin, IEventUserSingup } from './types';

export function setEventUserSingin(event: React.FormEvent<HTMLFormElement>): IEventUserSingin {
  const target = event.target as typeof event.target & {
    name: { value: string };
    password: { value: string };
  };
  return {
    name: target.name.value,
    password: target.password.value,
  };
}

export function setEventUserSingup(event: React.FormEvent<HTMLFormElement>): IEventUserSingup {
  const target = event.target as typeof event.target & {
    name: { value: string };
    password: { value: string };
    password2: { value: string };
  };
  return {
    name: target.name.value,
    password: target.password.value,
    password2: target.password2.value,
  };
}

export function setEventMessage(event: React.FormEvent<HTMLFormElement>): string {
  const target = event.target as typeof event.target & {
    text: { value: string };
  };
  return target.text.value;
}
