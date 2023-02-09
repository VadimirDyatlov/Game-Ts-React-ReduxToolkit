export interface IUserResponse {
  user: {
    id: string;
    name: string;
    gold: number;
    avatar: string;
  }
}

interface IUserState {
    id?: string;
    name?: string;
    gold?: number;
    avatar?: string;
}

export interface IAuthInitialState {
  user: IUserState;
  error: boolean | string;
  status: null | string;
}

export interface IUserSingUp {
  name: string;
  password: string;
  password2: string;
}

export type UserSingIn = {
  name: string;
  password: string;
}

export interface IUserLogOut {
  message: string;
}

export interface IEditUserData {
  name: string;
  password: string;
}
