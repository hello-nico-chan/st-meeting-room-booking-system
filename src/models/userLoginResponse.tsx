export class UserLoginResponse {
  constructor(
    public id: string,
    public username: string,
    public isAdmin: boolean,
    public accessToken: string,
    public refreshToken: string) {
  }
}
