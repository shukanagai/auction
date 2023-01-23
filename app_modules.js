// 設定
const config = require('./config');

// appモジュール宣言
const app = require('./app');

// httpServerモジュール宣言
const server = require('http').createServer(app);

// ソケットサーバモジュールを外部アクセスできるようにする
const io = require('socket.io')(server);

// チャットルームオブジェクトを外部アクセスできるようにする
const ChatRoom = require('./class/ChatRoom');
const cr = new ChatRoom(io, 0001);

// データベースモジュール
const awaitMysql = require('mysql-await');
const db = awaitMysql.createPool({
  host: config.dbConfig.host,
  user: config.dbConfig.user,
  password: config.dbConfig.password,
  database: config.dbConfig.database
});

// 標準入力
process.stdin.setEncoding("utf8");
let reader = require("readline").createInterface({
  input: process.stdin
});
reader.on("line", (text) => {
  switch (text) {
    case "getChatLog":
      console.log("ChatRoom -> log");
      console.log(cr.log);
      break;
    case "getUsers":
      console.log("ChatRoom -> users");
      console.log(cr.users);
      break;
    default:
      break;
  }
});

module.exports = {
  app,
  server,
  io,
  cr,
  db,
};