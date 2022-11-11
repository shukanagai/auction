var socket = io();

socket.emit('sendUserId', { id: id, token: token });

socket.on('updateUser', (data) => {
    updateUser(data.students);
});

// 音量調節
const waitVol = document.getElementsByTagName("audio");
for(let i = 0;i < waitVol.length; i++) {
    waitVol[i].volume = 0.1;
}
// waitVol.volume = 0.2;

/**
 * textareaのサイズ
 */
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

/**
 * チャット内容送受信
 */
const sendBtn = document.getElementById("send_button");
const chatArea = document.getElementById("main_chat");

/**
 * チャットの内容をサーバ側に送信
 */
sendBtn.addEventListener("click", (e) => {
    // e.preventDefault();
    if (textarea.value !== '') {
        socket.emit("appendMessage", textarea.value);
        textarea.value = '';
    }
});

/**
 * チャットの内容をサーバ側から受信
 */
socket.on("appendMessage", (sentMessage) => {
    let studentList;
    switch (sentMessage.type) {
        case 'comprehensionCheck':// 理解度チェック
            let comprehensionCheckList = [];
            studentList = sessionStorage.getItem('studentList');
            studentList = JSON.parse(studentList);
            studentList.forEach(elm => {
                let line = {"userId": '', "userName": '', "ans": ''};
                
                line.userId = elm.userId;
                line.userName = elm.userName;
                line.ans = '';
                
                comprehensionCheckList.push(line);
            });
            sessionStorage.setItem('comprehensionCheck', JSON.stringify(comprehensionCheckList));//理解度チェックを終了した時に削除する。

            // 表示設定
            sessionStorage.setItem('messageId', sentMessage.messageId);
            sessionStorage.setItem('totalMember', comprehensionCheckList.length);
            sessionStorage.setItem('understand', 0);
            sessionStorage.setItem('noUnderstand', 0);
            document.getElementById('totalMember').innerHTML = comprehensionCheckList.length;
            document.getElementById('understand').innerHTML = "0";
            document.getElementById('noUnderstand').innerHTML = "0";

            break;
        case 'attendanceCheck':// 受講チェック
            let attendanceCheckList = [];
            studentList = sessionStorage.getItem('studentList');
            studentList = JSON.parse(studentList);
            studentList.forEach(elm => {
                let line = {"userId": '', "userName": '', "res": ''};
                
                line.userId = elm.userId;
                line.userName = elm.userName;
                line.res = '';
                
                attendanceCheckList.push(line);//理解度チェックを終了した時に削除する。
            });
            sessionStorage.setItem('attendanceCheck', JSON.stringify(attendanceCheckList));

            // 表示設定
            sessionStorage.setItem('messageId', sentMessage.messageId);
            sessionStorage.setItem('remainMember', attendanceCheckList.length);
            document.getElementById('remaining').innerHTML = attendanceCheckList.length;

            break;
        default:
            createChatArea(sentMessage);
            // 仮-入力したところの画面に合うようにページを最下部に動かす(これだとチャットをさかのぼっている途中で面倒なことになるかも)
            chatArea.scrollTo(0, chatArea.scrollHeight);
            /* ----- textarea 元に戻す ----- */
            textarea.style.height = areaHeight + 'px';
            //入力内容の高さを取得
            let scrollHeight = textarea.scrollHeight;
            //textareaの高さに入力内容の高さを設定
            textarea.style.height = scrollHeight + 'px';
            break;
    }
});

/**
 * 各種通知音
 */
socket.on("wait", () => {
    //音声再生
    if(isMute == 1) {
        $('#wait-music')[0].play();
    }
});
socket.on("msg", () => {
    //音声再生
    if(isMute == 1) {
        $('#message-music')[0].play();
    }
});
socket.on("accent", () => {
    //音声再生
    if(isMute == 1) {
        $('#accent-music')[0].play();
    }
});

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

// 理解度チェック
let startTotal1 = document.getElementById("start_total1");
let finishTotal1 = document.getElementById("finish_total1");
let closeTotal1 = document.getElementById("back_menu2");
startTotal1.onclick = () => {
    socket.emit("startTotal1", '');
}
closeTotal1.onclick = () => {
    let messageId = sessionStorage.getItem('messageId');
    sessionStorage.removeItem('messageId');
    socket.emit("closeComprehensionCheck", {messageId: messageId});
}
/**
 * 理解度チェックの更新イベント
 */
socket.on("updateComprehensionCheck", (data) => {
    console.log(data);

    let comprehensionCheckList = JSON.parse(sessionStorage.getItem('comprehensionCheck'));
    console.log(comprehensionCheckList);
    for(let i = 0; i < comprehensionCheckList.length; i++) {
        if(comprehensionCheckList[i].userId == data.userId) {
            comprehensionCheckList[i].ans = data.ans;
        }
    }
    sessionStorage.setItem('finishComprehensionCheck', JSON.stringify(comprehensionCheckList));
    
    // 表示設定
    let understand = Number(sessionStorage.getItem('understand'));
    let noUnderstand = Number(sessionStorage.getItem('noUnderstand'));
    if(data.ans == 'YES') {
        understand = understand + 1;
        sessionStorage.setItem('understand', understand);
        document.getElementById('understand').innerHTML = understand;
    } else {
        noUnderstand = noUnderstand + 1;
        sessionStorage.setItem('noUnderstand', noUnderstand);
        document.getElementById('noUnderstand').innerHTML = noUnderstand;
    }
});
/**
 * 理解度チェックの終了イベント
 */
 finishTotal1.onclick = () => {
    // 表示の処理
    let totalMember = Number(sessionStorage.getItem('totalMember'));
    let understand = Number(sessionStorage.getItem('understand'));
    let noUnderstand = Number(sessionStorage.getItem('noUnderstand'));

    // ３項目innerHTML
    document.getElementById('ULtotalMember').innerHTML = totalMember;
    document.getElementById('ULunderstand').innerHTML = understand;
    document.getElementById('ULNoUnderstand').innerHTML = noUnderstand;

    sessionStorage.removeItem('comprehensionCheck');// {userId, userName, ans}
    sessionStorage.removeItem('totalMember');
    sessionStorage.removeItem('understand');
    sessionStorage.removeItem('noUnderstand');
    
    let messageId = sessionStorage.getItem('messageId');
    // socket.emit("finishComprehensionCheck", {socketId:socket.id, messageId: messageId});
}

// 受講チェック
let startTotal2 = document.getElementById("start_total2");
let finishTotal2 = document.getElementById("finish_total2");
let closeTotal2 = document.getElementById("back_menu4");
startTotal2.onclick = () => {
    socket.emit("startTotal2", '');
}
closeTotal2.onclick = () => {
    let messageId = sessionStorage.getItem('messageId');
    sessionStorage.removeItem('messageId');
    socket.emit("closeAttendanceCheck", {messageId: messageId});
}
/**
 * 受講チェックの更新イベント
 */
 socket.on("updateAttendanceCheck", (data) => {
    console.log(data);
    let attendanceCheckList = JSON.parse(sessionStorage.getItem('attendanceCheck'));
    for(let i = 0; i < attendanceCheckList.length; i++) {
        if(attendanceCheckList[i].userId == data.userId) {
            attendanceCheckList[i].res = data.ans;
        }
    }
    sessionStorage.setItem('attendanceCheck', JSON.stringify(attendanceCheckList));
    
    // 表示設定
    let remainMember = Number(sessionStorage.getItem('remainMember'));
    remainMember = remainMember - 1;
    sessionStorage.setItem('remainMember', remainMember);
    document.getElementById('remaining').innerHTML = remainMember; 
});
/**
 * 受講チェックの終了イベント
 */
 finishTotal2.onclick = () => {
    // 回答していない人の一覧で表示させる
    let remainNumber = Number(sessionStorage.getItem('remainMember'));
    let remainMemberList =  JSON.parse(sessionStorage.getItem('attendanceCheck'));
    let remainMemberString = '';
    remainMemberList.forEach(elm => {
        if(elm.res == '') {
            remainMemberString = remainMemberString + elm.userName + '／';
        }
    });
    remainMemberString = remainMemberString.slice(0, -1);
    if(remainNumber != 0) {
        document.getElementById('remainNumber').innerHTML = remainNumber;
    } else {
        document.getElementById('remainNumberTop').innerHTML = "全員が解答を終了しました。";
    }

    document.getElementById('remainMember').innerHTML = remainMemberString;

    sessionStorage.removeItem('attendanceCheck');// {userId, userName, res}
    sessionStorage.removeItem('remainMember');
    let messageId = sessionStorage.getItem('messageId');
    console.log(messageId);
    console.log(socket.id);
    // socket.emit("finishAttendanceCheck", {id: socket.id, messageId: messageId});
 }
 

$('body').on('click', '.kickBtn', function () {
    const userId = $(this).val();
    if (!confirm(`${userId}のキックを実行しますか?`)) {
        return false;
    } else {
        socket.emit(`kickStudent`, { userId: userId });
    }
});

function updateUser(students) {
    //globalStudentList = students;//ログイン中の生徒がオブジェクト形式{userName:, userId:}で格納される。
    sessionStorage.setItem('studentList', JSON.stringify(students));

    const userLengthInTop = document.getElementById('userLengthInTop');
    userLengthInTop.innerText = students.length;

    const studentListTable = document.getElementById('studentList');
    studentListTable.innerText = "";
    students.forEach(st => {
        const tr = document.createElement('tr');
        const tdUserId = document.createElement('td');
        const tdUserName = document.createElement('td');
        const tdKick = document.createElement('td');
        const kickBtn = document.createElement('button');
        kickBtn.classList.add('btn');
        kickBtn.classList.add('btn-danger');
        kickBtn.classList.add('kickBtn');
        kickBtn.value = st.userId;
        tdUserId.innerText = st.userId;
        tdUserName.innerText = st.userName;
        kickBtn.innerText = "キック";
        tdKick.appendChild(kickBtn);

        tr.appendChild(tdUserId);
        tr.appendChild(tdUserName);
        tr.appendChild(tdKick);
        studentListTable.appendChild(tr);
    });
}

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
    
    newChatMessage.innerText = gotData.content;
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

    // これらを新たに追加する
    chatArea.appendChild(newChatMain);
}