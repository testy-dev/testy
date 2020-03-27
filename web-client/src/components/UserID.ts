export default class {
  private static userID = 0;
  public static getUser() {
    return this.userID;
  }
  public static setUser(value: number) {
    this.userID = value;
  }
}
