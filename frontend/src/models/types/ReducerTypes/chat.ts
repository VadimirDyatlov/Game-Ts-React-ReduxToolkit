export interface IMessage {
  id: number
  ['User.name']: string
  user_id: number
  message: string
}

export interface IInitialState {
  messageHistory: [] | IMessage[]
}
