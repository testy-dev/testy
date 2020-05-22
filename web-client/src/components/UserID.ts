let userID = 0;

export default {
  getUser() {
    return userID;
  },
  setUser(value: number) {
    userID = value;
  }
};
