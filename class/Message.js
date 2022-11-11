// メッセージオブジェクト

module.exports = class Message{
  constructor(messageId, type, content, userId, userName, timeStamp) {
    this.messageId = messageId;
    this.type = type;
    this.content = content;
    this.userName = userName;
    this.userId = userId;
    this.timeStamp = timeStamp;
  }
}