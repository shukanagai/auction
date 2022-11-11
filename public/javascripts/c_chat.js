var socket = io();

socket.on("returnTop", function (data) {
    window.location.href = '/login';
});

// token
let socketId = socket.id;
let myToken = "";

socket.emit('sendUserId', { id: id, token: token });


/*textareaサイズ*/
const textarea = document.getElementById("textArea");
let areaHeight = textarea.clientHeight; //デフォルトの高さ取得
// console.log(areaHeight);
textarea.addEventListener('input', () => {
    textarea.style.height = areaHeight + 'px';
    //入力内容の高さを取得
    let scrollHeight = textarea.scrollHeight;
    //textareaの高さに入力内容の高さを設定
    textarea.style.height = scrollHeight + 'px';
});

/* ----- チャット内容送受信 ----- */
const sendBtn = document.getElementById("send_button");
const chatArea = document.getElementById("main_chat");

// チャット内容をサーバ側に送信
sendBtn.addEventListener("click", (e) => {
    // e.preventDefault();
    if (textarea.value !== '') {
        socket.emit("appendMessage", textarea.value);
        textarea.value = '';
    }
});

// チャット内容をサーバ側から受信
socket.on("appendMessage", (sentMessage) => {
    // これらを新たに追加する
    chatArea.appendChild(createChatArea(sentMessage));
    // 仮-入力したところの画面に合うようにページを最下部に動かす(これだとチャットをさかのぼっている途中で面倒なことになるかも)
    chatArea.scrollTo(0, chatArea.scrollHeight);
    /* ----- textarea 元に戻す ----- */
    textarea.style.height = areaHeight + 'px';
    //入力内容の高さを取得
    let scrollHeight = textarea.scrollHeight;
    //textareaの高さに入力内容の高さを設定
    textarea.style.height = scrollHeight + 'px';
});


/* コールアンドレスポンス関連
* ちょっと待った
* 障害発生
**/
let wait = document.getElementById("wait");
let voiceDisturbed = document.getElementById("voice-disturbed");
let imageDistorted = document.getElementById("image-distorted");
let teacherLogout = document.getElementById("teacher-logout");
// ちょっと待ったボタン
wait.onclick = () => {
    // console.log("ちょっと待ってね");
    // const music = new Audio('se/wait.mp3');
    // music.play();
    socket.emit("wait", socket.id);
};

// 障害発生ボタン
// 音声障害
voiceDisturbed.onclick = () => {
    // console.log("音声障害");
    socket.emit("voiceDisturbed", socket.id);
}
//映像障害
imageDistorted.onclick = () => {
    // console.log("映像障害");
    socket.emit("imageDistorted", socket.id);
}
//先生障害
teacherLogout.onclick = () => {
    // console.log("先生障害");
    socket.emit("teacherLogout", socket.id);
}

/**
 * 音声障害イベントをサーバ側から受信
 */
socket.on("voiceDisturbed", (sentVoiceDisturbed) => {
    // これらを新たに追加する
    chatArea.appendChild(createChatArea(sentVoiceDisturbed));
    // 仮-入力したところの画面に合うようにページを最下部に動かす(これだとチャットをさかのぼっている途中で面倒なことになるかも)
    chatArea.scrollTo(0, chatArea.scrollHeight);
    /* ----- textarea 元に戻す ----- */
    textarea.style.height = areaHeight + 'px';
    //入力内容の高さを取得
    let scrollHeight = textarea.scrollHeight;
    //textareaの高さに入力内容の高さを設定
    textarea.style.height = scrollHeight + 'px';
});
/**
 * 映像障害イベントをサーバ側から受信
 */
socket.on("imageDistorted", (sentImageDistorted) => {
    // これらを新たに追加する
    chatArea.appendChild(createChatArea(sentImageDistorted));
    // 仮-入力したところの画面に合うようにページを最下部に動かす(これだとチャットをさかのぼっている途中で面倒なことになるかも)
    chatArea.scrollTo(0, chatArea.scrollHeight);
    /* ----- textarea 元に戻す ----- */
    textarea.style.height = areaHeight + 'px';
    //入力内容の高さを取得
    let scrollHeight = textarea.scrollHeight;
    //textareaの高さに入力内容の高さを設定
    textarea.style.height = scrollHeight + 'px';
});
/**
 * 先生離脱障害イベントをサーバ側から受信
 */
socket.on("teacherLogout", (sentTeacherLogout) => {
    // これらを新たに追加する
    chatArea.appendChild(createChatArea(sentTeacherLogout));
    // 仮-入力したところの画面に合うようにページを最下部に動かす(これだとチャットをさかのぼっている途中で面倒なことになるかも)
    chatArea.scrollTo(0, chatArea.scrollHeight);
    /* ----- textarea 元に戻す ----- */
    textarea.style.height = areaHeight + 'px';
    //入力内容の高さを取得
    let scrollHeight = textarea.scrollHeight;
    //textareaの高さに入力内容の高さを設定
    textarea.style.height = scrollHeight + 'px';
});

/**
 * ログイン中のユーザ取得
 */
socket.on('updateUser', (data) => {
    updateUser(data.students);
});

function updateUser(students) {
    const userLengthInTop = document.getElementById('userLengthInTop');
    userLengthInTop.innerText = students.length;
    const userLengthInModal = document.getElementById('userLengthInModal');
    userLengthInModal.innerText = `参加者数：${students.length}人`;

    const userListInModal = document.getElementsByClassName('p-c_chat_modal__members')[0];
    userListInModal.innerText = "";
    students.forEach(st => {
        const div = document.createElement('div');
        div.className = "p-c_chat_modal__member";
        div.appendChild(document.createElement('div'));
        const p = document.createElement('p');
        p.innerText = st.userName;
        div.appendChild(p);
        userListInModal.appendChild(div);
    });
}

/**
 * 受講チェック終了イベント
 */
 socket.on('closeAttendanceCheck', (sentMessage) => {
    console.log("closeAttendance");
    console.log(sentMessage);
    let messageId = JSON.parse(sessionStorage.getItem('messageId'));
    if(messageId != null) {
        sentMessage.content = '受講確認が取れませんでした。しっかりと受講していますか？';
        chatArea.appendChild(createChatArea(sentMessage));
        chatArea.scrollTo(0, chatArea.scrollHeight);
        textarea.style.height = areaHeight + 'px';
        let scrollHeight = textarea.scrollHeight;
        textarea.style.height = scrollHeight + 'px';
    }
 });
 /**
 * 理解度チェック終了イベント
 */
 socket.on('closeComprehensionCheck', (sentMessage) => {
     console.log("closeComprehension");
     console.log(sentMessage);
     let messageId = JSON.parse(sessionStorage.getItem('messageId'));
     if(messageId != null) {
        sentMessage.content = '投票を締め切りました。時間以内になるべく投票してください。';
        chatArea.appendChild(createChatArea(sentMessage));
        chatArea.scrollTo(0, chatArea.scrollHeight);
        textarea.style.height = areaHeight + 'px';
        let scrollHeight = textarea.scrollHeight;
        textarea.style.height = scrollHeight + 'px';
    }
 });

 
/**
 * 表示形式を組み立てる関数
 * @param {} gotData 
 * @returns 
 */
function createChatArea(gotData) {
    // チャットのひとかたまりのdiv作成
    let newChatMain = document.createElement('div');
    // 自分自身か否かでクラスを変える
    if (gotData.userId == id) {
        newChatMain.className = "p-c_chat-main__talk-box-me";
    } else {
        newChatMain.className = "p-c_chat-main__talk-box";
    }
    // アイコンとユーザ名を表示するdiv作成(ただし、自分自身の場合はなし)
    if (gotData.userId != id) {
        let newIcon = document.createElement('div');
        newIcon.className = "p-c_chat-main__icon-img";
        let newUsername = document.createElement('div');
        newUsername.className = "p-c_chat-main__user-name";
        newUsername.innerText = gotData.userName;
        newChatMain.appendChild(newIcon);
        newChatMain.appendChild(newUsername);
    }
    // チャット内容を表示するdiv作成
    let newChatMessage = document.createElement('div');
    // 自分自身か否かでクラスを変える
    if (gotData.userId == id) {
        newChatMessage.className = "p-c_chat-main__balloon-me";
    } else {
        newChatMessage.className = "p-c_chat-main__balloon";
    }

    switch (gotData.type) {
        case 'comprehensionCheck':
            newChatMessage.innerHTML = "ここまでの内容は理解できましたか？";
            let btNormal = document.createElement('div');
            btNormal.className = "c-button--nomal";
            btNormal.id = "btNormal";
            btNormal.setAttribute('onclick', 'clickNormal()');
            btNormal.innerHTML = "理解しました";

            let btCancel = document.createElement('div');
            btCancel.className = "c-button--cancel";
            btCancel.id = "btCancel";
            btCancel.setAttribute('onclick', 'clickCancel()');
            btCancel.innerHTML = "わからないところがあった";

            //sessionストレージにmessageIdを保存
            sessionStorage.setItem('messageId', JSON.stringify(gotData));

            newChatMessage.appendChild(btNormal);
            newChatMessage.appendChild(btCancel);
            break;
        case 'attendanceCheck':
            newChatMessage.innerHTML = "しっかり受講していますか？";
            let btAttend = document.createElement('div');
            btAttend.className = "c-button--nomal";
            btAttend.id = "btNormal";
            btAttend.setAttribute('onclick', 'clickOfCourse()');
            btAttend.innerHTML = "はい";
            sessionStorage.setItem('messageId', JSON.stringify(gotData));
            newChatMessage.appendChild(btAttend);
            break;
        default:
            newChatMessage.innerText = gotData.content;
    }
    newChatMain.appendChild(newChatMessage);

    // 投稿時間を表示するdiv作成
    let newTime = document.createElement('div');
    if (id == gotData.userId) {
        newTime.className = "p-c_chat-main__post-time-me";
    } else {
        newTime.className = "p-c_chat-main__post-time";
    }

    // スペースで配列に分割
    let timeArr = gotData.timeStamp.split(' ');
    // 分割をさらに分割
    let splitedTime = timeArr[1].substr(0, 5);
    // h:mm→0h:mm
    if (splitedTime.substr(4, 1) == ":") {
        splitedTime = "0" + splitedTime.substr(0, 4);
    }
    newTime.innerText = splitedTime;
    newChatMain.appendChild(newTime);

    return newChatMain;
}

/**
 * 理解度に関する関数2つ
 */
function clickNormal() { 
    let sendMessageId = JSON.parse(sessionStorage.getItem('messageId'));
    //ここでappendmessageのイベントと同じ処理
    let message = JSON.parse(sessionStorage.getItem('messageId'));
    message.type = 'message';
    message.content = userName + 'はここまでの内容を「理解しました」と答えました。';
    console.log(message);
    chatArea.appendChild(createChatArea(message));
    chatArea.scrollTo(0, chatArea.scrollHeight);
    textarea.style.height = areaHeight + 'px';
    let scrollHeight = textarea.scrollHeight;
    textarea.style.height = scrollHeight + 'px';
    
    //めっせーじIDのonclick削除
    document.getElementById("btNormal").remove();
    document.getElementById("btCancel").remove();
    
    sessionStorage.clear();
    socket.emit('updateComprehensionCheck', { id: socket.id, ans: "YES", messageId: sendMessageId.messageId});
}
function clickCancel() {
    let sendMessageId = JSON.parse(sessionStorage.getItem('messageId'));
    //ここでappendmessageのイベントと同じ処理
    let message = JSON.parse(sessionStorage.getItem('messageId'));
    message.type = 'message';
    message.content = userName + 'はここまでの内容を「理解していない」と答えました。';
    console.log(message);
    chatArea.appendChild(createChatArea(message));
    chatArea.scrollTo(0, chatArea.scrollHeight);
    textarea.style.height = areaHeight + 'px';
    let scrollHeight = textarea.scrollHeight;
    textarea.style.height = scrollHeight + 'px';
    document.getElementById("btNormal").remove();
    document.getElementById("btCancel").remove();
    sessionStorage.clear();
    socket.emit('updateComprehensionCheck', { id: socket.id, ans: "NO", messageId: sendMessageId.messageId});
}
// 受講チェックへの返答をする関数
function clickOfCourse() {
    let sendMessageId = JSON.parse(sessionStorage.getItem('messageId'));
    //ここでappendmessageのイベントと同じ処理
    let message = JSON.parse(sessionStorage.getItem('messageId'));
    message.type = 'message';
    message.content = userName + 'はしっかりと受講していることを確認しました。';
    chatArea.appendChild(createChatArea(message));
    chatArea.scrollTo(0, chatArea.scrollHeight);
    textarea.style.height = areaHeight + 'px';
    let scrollHeight = textarea.scrollHeight;
    textarea.style.height = scrollHeight + 'px';
    document.getElementById("btNormal").remove();
    sessionStorage.clear();
    socket.emit('updateAttendanceCheck', { id: socket.id, ans: "YES", messageId: sendMessageId.messageId});
}