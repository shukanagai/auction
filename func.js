// DB参照系SQL
const selectSql = {
  users: "SELECT * FROM Users",
  students: "SELECT * FROM students",
  teachers: "SELECT * FROM teachers"
};

// ログインIDを使いDBでユーザ検索
const getUserOnDB = async (loginId) => {
  const db = require('./app_modules').db;
  const sql = `${selectSql.users} WHERE login = "${loginId}"`;

  let results;
  try {
    results = await db.awaitQuery(sql);
  } catch (error) {
    console.log(`getUserOnDB : データ取得失敗`);
    return;
  }

  if (results[0] != undefined) {
    return results[0];
  } else {
    return undefined;
  }
};

// 文字ハッシュ化関数
const hashEncode = (text) => {
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(text).digest('hex');
};

module.exports = {
  getUserOnDB,
  hashEncode
};