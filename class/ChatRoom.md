# ChatRoomクラス
主な機能は以下の通り
- サーバーサイドのソケット通信の簡略化
- チャットログの管理・出力

## コンストラクタ
宣言でチャットルーム一つを起こすことができる。
### 引数
1. ソケットオブジェクト`io`
2. 部屋ごとに割り振られる固有数字`roomId`


```javascript
const io = socketio(server);
const roomId = '0001'; // String

const chatRoom = new ChatRoom(io, roomId);
```

## `appendMessage`
メッセージがユーザから送信された際に、サーバ側で実行する

### 動作
1. ソケットIDから送信者特定
2. メッセージID割り当て
3. タイムスタンプ生成
4. サーバにロギング
5. ルーム内にソケット全体送信

### 引数
1. ソケットID`socketId`
2. メッセージ本文`message`(String型)

```javascript
  socket.on('appendMessage', (message)=>{
    chatRoom.appendMessage(socket.id, message);
  });
```