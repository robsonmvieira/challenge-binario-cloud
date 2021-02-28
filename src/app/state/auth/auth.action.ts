export class Login {
  static readonly type = '[auth] login'
  constructor() {}
}

export class SetToken {
  static readonly type = '[auth] set token'
  constructor(public payload: string) {}
}
