/* ----- ログイン認証 ----- */
const form = document.getElementById("form");
const inputId = document.getElementById("loginId");
const inputPass = document.getElementById("loginPass");
const errorMsg = document.getElementById("error");

// DBから取ってくる?
// let loginId = "izawa";
// let loginPass = "1234";

// 入力チェック
form.onclick = (e) => {
    if(inputId.value === "" || inputPass.value === ""){
        errorMsg.textContent = "ID、パスワードを入力してください"
        inputPass.value = "";
    }
};
















