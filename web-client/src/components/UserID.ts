function UserID(this: any) {
  this.userID = 0;
  this.getUser = () => this.userID;
  this.setUser = (value: number) => this.userID = value;
  return this;
}

export default UserID();
