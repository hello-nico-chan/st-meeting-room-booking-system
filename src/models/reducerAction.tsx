export class ReducerAction {
  type: string;
  payload: string;
  constructor(type: string, payload: string) {
    this.type = type;
    this.payload = payload;
  }
}
