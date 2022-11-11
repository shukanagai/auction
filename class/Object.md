# オブジェクトの仕様

## Userオブジェクト
```javascript
{
  userId: (str)ユーザID,
  userName: (str)ユーザ名,
  iconPath: (str)アイコン画像のパス,
  socketId: (str)ソケットID
}
```

## Usersオブジェクト
```javascript
{
  io: ソケットオブジェクト,
  roomId: (int)ルームID,
  log: [
    {
      messageId: (int)メッセージID,
      userId: (str)ユーザID,
      message: (str)メッセージ本文,
      timeStamp: タイムスタンプ
    },
    {
      messageId: (int)メッセージID,
      userId: (str)ユーザID,
      message: (str)メッセージ本文,
      timeStamp: タイムスタンプ
    }
  ]
}
```