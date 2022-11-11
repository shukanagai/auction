// todo
// チャットエクスポート

const Message = require('./Message');

module.exports = class ChatRoom {
  constructor(io, roomId) {
    this.log = [];
    this.users = [];
    this.io = io;
    this.roomId = roomId;

    io.on('connection', (socket) => {
      //updateUserイベント、lengthかuserlist

      // sendUserId
      socket.on('sendUserId', (data) => {
        try {
          this.setSocketId(data.token, data.id, socket.id);
          socket.emit('getChatLog', this.getChatLog(socket.id));
          console.log(this.users);
          console.log(`接続 : ${this.getUserBySocketId(socket.id).userName}`);
          this.updateUser();
        } catch (error) {
          console.log(error.message);
          console.log(`ChatRoom -> socket.on('sendUserId') : 失敗`);
        }
      });

      // キック
      socket.on('kickStudent', (user) => {
        try {
          const socketId = this.getUserByUserId(user.userId).socketId;
          socket.to(socketId).emit('returnTop', '');
        } catch (error) {
          console.log('キック失敗');
        }
      });

      // appendMessage
      socket.on('appendMessage', (message) => {
        // 正規ルートアクセス検知
        if (!this.checkRegularRoot(socket.id)) {
          console.log(`不正アクセス検知`);
          return;
        }
        console.log(`メッセージ受信 : ${message} By ${this.getUserBySocketId(socket.id).userName}`);
        this.appendMessage(socket.id, message);
        //音声処理
        this.io.emit('msg', '');
      });

      // updateAttendanceCheck
      socket.on('updateAttendanceCheck', (data) => {
        // 正規ルートアクセス検知
        if (!this.checkRegularRoot(socket.id)) {
          console.log(`不正アクセス検知`);
          return;
        }
        this.updateAttendanceCheck(socket.id, data.ans, data.messageId);
      });

      // finishAttendanceCheck
      socket.on('finishAttendanceCheck', (data) => {
        // 正規ルートアクセス検知
        if (!this.checkRegularRoot(socket.id)) {
          console.log(`不正アクセス検知`);
          return;
        }

        this.finishAttendanceCheck(data.messageId);
      });

      // updateComprehensionCheck
      socket.on('updateComprehensionCheck', (data) => {
        // 正規ルートアクセス検知
        if (!this.checkRegularRoot(socket.id)) {
          console.log(`不正アクセス検知`);
          return;
        }
        this.updateComprehensionCheck(socket.id, data.ans, data.messageId);
      });

      // finishComprehensionCheck
      socket.on('finishComprehensionCheck', (data) => {
        // 正規ルートアクセス検知
        if (!this.checkRegularRoot(socket.id)) {
          console.log(`不正アクセス検知`);
          return;
        }

        this.finishComprehensionCheck(data.messageId);
      });

      // disconnect
      socket.on('disconnect', () => {
        // 正規ルートアクセス検知
        if (!this.checkRegularRoot(socket.id)) {
          console.log(`不正アクセス検知`);
          return;
        }
        try {
          console.log(`切断 : ${this.getUserBySocketId(socket.id).userName}`);
          this.removeUserBySocketId(socket.id);
          //emit updateUser 同上
          // this.io.emit("updateUser", this.users);
        } catch (error) {
          console.log(`ChatRoom.js -> socket.on('disconnect') : CatchError`);
        }

        this.updateUser();
      });

      //ちょっと待ってボタン
      socket.on('wait', (socketId) => {
        // 正規ルートアクセス検知
        if (!this.checkRegularRoot(socket.id)) {
          console.log(`不正アクセス検知`);
          return;
        }
        const user = this.getUserBySocketId(socketId);
        const message = user.getUserName() + "が「ちょっと待って通知」を送信しました";
        this.appendMessage(socketId, message);
        this.io.emit('wait', '');
      });

      // 音声障害
      socket.on("voiceDisturbed", (socketId) => {
        // 正規ルートアクセス検知
        if (!this.checkRegularRoot(socket.id)) {
          console.log(`不正アクセス検知`);
          return;
        }
        const user = this.getUserBySocketId(socketId);
        const message = user.getUserName() + "が「音声の乱れ」を報告しました";
        this.appendMessage(socketId, message);
        this.io.emit('accent', '');
      });
      // 映像障害
      socket.on("imageDistorted", (socketId) => {
        // 正規ルートアクセス検知
        if (!this.checkRegularRoot(socket.id)) {
          console.log(`不正アクセス検知`);
          return;
        }
        const user = this.getUserBySocketId(socketId);
        const message = user.getUserName() + "が「映像の乱れ」を報告しました";
        this.appendMessage(socketId, message);
        this.io.emit('accent', '');
      });
      // 先生障害
      socket.on("teacherLogout", (socketId) => {
        // 正規ルートアクセス検知
        if (!this.checkRegularRoot(socket.id)) {
          console.log(`不正アクセス検知`);
          return;
        }
        const user = this.getUserBySocketId(socketId);
        const message = user.getUserName() + "が「先生の切断」を報告しました";
        this.appendMessage(socketId, message);
        this.io.emit('accent', '');
      });
      //理解度集計
      socket.on("startTotal1", () => {
        this.appendComprehensionCheck(socket.id);
      });
      //受講チェック
      socket.on("startTotal2", () => {
        this.appendAttendanceCheck(socket.id);
      });
    });
  }

  // 正規ルートアクセスチェック
  checkRegularRoot(socketId) {
    try {
      if (this.getUserBySocketId(socketId) == null) {
        // 不正アクセス
        this.io.sockets.to(socketId).emit('returnTop', '');
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log(`エラー: User.checkRegularRoot`);
    }
  }

  getUsers() {
    return this.users;
  }

  updateUser() {
    // 生徒に送信するユーザ一覧情報
    let studentsToStudent = this.getStudentsToStudent();
    let studentsToTeacher = this.getStudentsToTeacher();
    this.users.forEach((us) => {
      if (us.userType == 0) {
        // 生徒
        this.io.to(us.socketId).emit('updateUser', { students: studentsToStudent });
      } else if (us.userType == 1) {
        // 教師
        this.io.to(us.socketId).emit("updateUser", { students: studentsToTeacher });
      }
    });
  }

  // 生徒サイドのユーザリストを取得するメソッド
  getStudentsToStudent() {
    let students = [];
    this.users.forEach((us) => {
      if (us.userType == 0) {
        students.push({
          userName: us.userName
        });
      }
    });
    return students;
  }

  getStudentsToTeacher() {
    let students = [];
    this.users.forEach((us) => {
      if (us.userType == 0) {
        students.push({
          userName: us.userName,
          userId: us.userId,
        });
      }
    });
    return students;
  }

  setSocketId(token, userId, socketId) {
    try {
      const user = this.getUserByUserId(userId);
      if (user.token == token) {
        user.socketId = socketId;
        // console.log(`ChatRoom.js -> setSocketId : 成功`);
      } else {
        console.log(`ChatRoom.js -> setSocketId : 失敗`);
      }
    } catch (error) {
      console.log(error.message);
      console.log(`ChatRoom.js -> setSocketId : CatchError`);
    }
  }

  getUserBySocketId(socketId) {
    if (this.users.some((us) => us.socketId == socketId)) {
      return this.users.find((us) => us.socketId == socketId);
    }
    return null;
  }

  getUserByUserId(userId) {
    if (this.users.some((us) => us.userId == userId)) {
      return this.users.find((us) => us.userId == userId);
    }
    return null;
  }

  addUser(user) {
    this.users.push(user);
  }

  removeUserBySocketId(socketId) {
    this.users.forEach((us, key) => {
      if (us.socketId == socketId) {
        this.users.splice(key, 1);
        // console.log(`removeUserBySocketId : 成功`);
        return;
      }
    });
  }

  getSocket() {
    return this.io;
  }

  getRoomId() {
    return this.roomId;
  }

  getTeacher() {
    if (this.users.some((us) => us.userType == 1)) {
      return this.users.find((us) => us.userType == 1);
    } else {
      return null;
    }
  }

  // メッセージログ要求(人によって変化)
  getChatLog(socketId) {
    let resLog = [];
    let obj;

    for (const key in this.log) {
      obj = this.log[key];
      try {
        switch (obj.type) {
          case 'message':
            resLog.push({
              messageId: obj.messageId,
              type: 'message',
              userName: obj.userName,
              content: obj.content,
              userId: obj.userId,
              timeStamp: obj.timeStamp
            });
            break;

          case 'comprehensionCheck':
            if (obj.content.isFinish == true) {
              // 集計済み(メッセージ状態で返却)
              let message = "";
              // 自分の回答状態をメッセージ化
              if (obj.content.results.some((rs) => rs.id == this.getUserBySocketId(socketId).userId)) {
                // 自分が回答対象内の場合
                const ans = obj.content.results.find((rs) => rs.id == this.getUserBySocketId(socketId).userId).result;
                switch (ans) {
                  case 'YES':
                    message = "あなたはここまでの内容を「理解しました」と答えました";
                    break;

                  case 'NO':
                    message = "あなたはここまでの内容を「理解していません」と答えました";
                    break;
                }
              } else {
                // 自分が回答対象外の場合
                message = "あなたはこの理解度チェックに参加していません";
              }
              // push
              resLog.push({
                messageId: obj.messageId,
                type: 'message',
                content: message,
                userId: obj.userId,
                userName: obj.userName,
                timeStamp: obj.timeStamp
              });
            } else {
              // 集計中(理解度チェックobjのresultsに生徒追加)
              let message;
              if (obj.content.results.some((rs) => rs.id == this.getUserBySocketId(socketId).userId)) {
                // 自分のが既にある時
                const ans = obj.content.results.find((rs) => rs.id == this.getUserBySocketId(socketId).userId).result;
                switch (ans) {
                  case 'YES':
                    message = "あなたはここまでの内容を「理解しました」と答えました";
                    break;

                  case 'NO':
                    message = "あなたはここまでの内容を「理解していません」と答えました";
                    break;
                }

                if (ans != null) {
                  // 入力済み
                  resLog, push({
                    messageId: obj.messageId,
                    type: 'message',
                    content: message,
                    userId: obj.userId,
                    userName: obj.userName,
                    timeStamp: obj.timeStamp
                  });
                } else {
                  // 未入力
                  resLog.push({
                    messageId: obj.messageId,
                    type: 'comprehensionCheck',
                    content: obj.content,
                    userId: obj.userId,
                    userName: obj.userName,
                    timeStamp: obj.timeStamp
                  });
                }
              } else {
                // 自分のがなく、集計中
                // 理解度チェックに仲間入り
                this.log[key].content.results.push({
                  id: this.getUserBySocketId(socketId),
                  result: null
                });

                resLog.push({
                  messageId: obj.messageId,
                  type: 'comprehensionCheck',
                  content: obj.content,
                  userId: obj.userId,
                  userName: obj.userName,
                  timeStamp: obj.timeStamp
                });
              }
            }
            break;
        }
      } catch (error) {
        console.log(`ChatRoom -> getChatLog: errorだよ`);
        console.log(error.message);
      }
    }
    console.log("ChatRoom -> getChatLog -> resLog-------");
    console.log(resLog);

    return resLog;
  }

  updateAttendanceCheck(socketId, ans, messageId) {
    try {
      const user = this.getUserBySocketId(socketId);
      const obj = this.log.find((ms) => ms.messageId == messageId);
      const result = obj.content.results.find((rs) => rs.userId == user.userId);
      result.result = ans;

      // 教員にemit
      const emitSocketName = 'updateAttendanceCheck';
      const teacherSocketId = this.getTeacher().socketId;

      this.io.to(teacherSocketId).emit(emitSocketName, {
        userId: user.userId,
        ans: ans
      });
    } catch (error) {
      console.log(`ChatRoom -> updateAttendanceCheck : catchError`);
    }
  }

  // 終了する理解度チェックのmessageId
  finishAttendanceCheck(messageId) {
    try {
      const attendanceCheckContent = this.log.find((ms) => ms.messageId == messageId).content;
      attendanceCheckContent.isFinish = true;

      // ソケットをルーム内に全体送信
      const teacher = this.getUserBySocketId(socketId);
      const messageId = this.log.length;
      const timeStamp = new Date().toLocaleString({ timeZone: 'Asia/Tokyo' });
      const emitSocketName = 'closeAttendanceCheck';

      this.io.emit(emitSocketName, {
        userId: teacher.getUserId(),
        userName: teacher.getUserName(),
        messageId: messageId,
        type: 'Message',
        timeStamp: timeStamp
      });
    } catch (error) {
      console.log(`ChatRoom -> finishAttendanceCheck : catchError`);
    }
  }

  // 送信生徒のソケットID, 回答(YES, NO), 更新する理解度チェックオブジェクトのmessageId
  updateComprehensionCheck(socketId, ans, messageId) {
    try {
      const user = this.getUserBySocketId(socketId);
      const obj = this.log.find((ms) => ms.messageId == messageId);
      const result = obj.content.results.find((rs) => rs.userId == user.userId);
      result.result = ans;

      // 教員にemit
      const emitSocketName = 'updateComprehensionCheck';
      const teacherSocketId = this.getTeacher().socketId;

      this.io.to(teacherSocketId).emit(emitSocketName, {
        userId: user.userId,
        ans: ans
      });
    } catch (error) {
      console.log(`ChatRoom -> updateComprehensionCheck : catchError`);
    }
  }

  // 終了する理解度チェックのmessageId
  finishComprehensionCheck(messageId) {
    try {
      const comprehensionCheckContent = this.log.find((ms) => ms.messageId == messageId).content;
      comprehensionCheckContent.isFinish = true;

      // ソケットをルーム内に全体送信
      const teacher = this.getUserBySocketId(socketId);
      const messageId = this.log.length;
      const timeStamp = new Date().toLocaleString({ timeZone: 'Asia/Tokyo' });
      const emitSocketName = 'closeComprehensionCheck';
      console.log(messageId);
      this.io.emit(emitSocketName, {
        userId: teacher.getUserId(),
        userName: teacher.getUserName(),
        messageId: messageId,
        type: 'Message',
        timeStamp: timeStamp
      });
    } catch (error) {
      console.log(`ChatRoom -> finishComprehensionCheck : catchError`);
    }
  }

  // 理解度チェック追加
  appendComprehensionCheck(socketId) {
    const emitSocketName = 'appendMessage';
    const teacher = this.getUserBySocketId(socketId);
    const messageId = this.log.length;
    const timeStamp = new Date().toLocaleString({ timeZone: 'Asia/Tokyo' });
    let results = [];
    this.users.forEach((us) => {
      results.push({
        userId: us.userId,
        result: null
      });
    });
    const content = {
      results: results,
      isFinish: false
    };
    // サーバにロギング
    this.log.push(new Message(messageId, 'comprehensionCheck', content, teacher.getUserId(), teacher.getUserName(), timeStamp));

    // ソケットをルーム内に全体送信
    this.io.emit(emitSocketName, {
      userId: teacher.getUserId(),
      userName: teacher.getUserName(),
      messageId: messageId,
      type: 'comprehensionCheck',
      timeStamp: timeStamp
    });
  }
  // 受講チェック
  appendAttendanceCheck(socketId) {
    const emitSocketName = 'appendMessage';
    const teacher = this.getUserBySocketId(socketId);
    const messageId = this.log.length;
    const timeStamp = new Date().toLocaleString({ timeZone: 'Asia/Tokyo' });
    let results = [];
    this.users.forEach((us) => {
      results.push({
        userId: us.userId,
        result: null
      });
    });
    const content = {
      results: results,
      isFinish: false
    };
    // サーバにロギング
    this.log.push(new Message(messageId, 'attendanceCheck', content, teacher.getUserId(), teacher.getUserName(), timeStamp));

    // ソケットをルーム内に全体送信
    this.io.emit(emitSocketName, {
      userId: teacher.getUserId(),
      userName: teacher.getUserName(),
      messageId: messageId,
      type: 'attendanceCheck',
      timeStamp: timeStamp
    });
  }

  // メッセージログ追加
  appendMessage(socketId, message) {
    const emitSocketName = 'appendMessage';
    const user = this.getUserBySocketId(socketId);
    const messageId = this.log.length;
    const timeStamp = new Date().toLocaleString({ timeZone: 'Asia/Tokyo' });
    // サーバにロギング
    this.log.push(new Message(messageId, 'message', message, user.getUserId(), user.getUserName(), timeStamp));

    // ソケットをルーム内に全体送信
    // this.getSocket().to(this.getRoomId()).emit(emitSocketName, {
    this.io.emit(emitSocketName, {
      userId: user.getUserId(),
      userName: user.getUserName(),
      messageId: messageId,
      type: 'message',
      content: message,
      timeStamp: timeStamp
    });
  }

  // CSVファイルにログ出力
  // exportLog(){}
}