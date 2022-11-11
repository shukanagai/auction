// 1ユーザに対し1オブジェクト作成するユーザ情報を格納したオブジェクト

module.exports = class User{
  constructor(userId, userName, token, userType) {
    this.userId = userId;
    this.userName = userName;
    this.token = token;
    this.socketId = null;
    this.userType = userType;
  }

  changeUserName(userName){
    this.userName = userName;
  }
  changeSocketId(socketId){
    this.socketId = socketId;
  }

  // getter
  getUserId(){
    return this.userId;
  }
  getUserName(){
    return this.userName;
  }
  getSocketId(){
    return this.socketId;
  }
}