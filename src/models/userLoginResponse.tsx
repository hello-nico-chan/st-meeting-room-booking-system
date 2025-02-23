export class UserLoginResponse {
    id: string;
    username: string;
    accessToken: string;
    refreshToken: string;
    constructor(id: string, username: string, accessToken: string, refreshToken: string) {
      this.id = id;
      this.username = username;
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
    }
  }
  