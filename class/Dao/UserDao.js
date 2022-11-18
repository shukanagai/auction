const mysql = require('mysql2/promise');

// const dbConf = require('../../config').dbConfig;
const dbConf = {
  host: '3.115.111.52',
  user: 'auction',
  password: 'tokoro',
  database: 'auction'
};
/**
 * 会員管理に必要なデータ
 */
module.exports = {
  /**
   * 会員一覧表示
   */
  findAll: async function () {
    // sql
    const sql = `SELECT * FROM users`;
    // select実行
    const connection = await mysql.createConnection(dbConf);
    const [rows, fields] = await connection.execute(sql);
    await connection.end();

    /**
     * データの加工処理&データ返す処理
     */
    console.log(rows);
    console.log(fields);
  },

  /**
   * PKから会員の詳細情報を選択
   */
  findUserByPK: async function (id) {
    // sql
    const sql = `SELECT * FROM users WHERE US_id = ` + id;
    // select実行
    const connection = await mysql.createConnection(dbConf);
    const [rows, fields] = await connection.execute(sql);
    await connection.end();

    /**
     * データの加工処理&データ返す処理
     */
  },

  /**
   * 会員の詳細情報を更新
   */
  insert: async function (name, loginId, password, gender, birthday, address, mail, tel) {
    // sql
    const sql = `INSERT INTO users (US_name, US_login_id, US_password, US_gender, US_birthday, US_address, US_mail, US_tel, US_ban) VALUES('${name}', '${loginId}', '${password}', '${gender}', ${birthday}, '${address}', '${mail}', '${tel}', 0)`;
    // insert実行
    const connection = await mysql.createConnection(dbConf);
    await connection.query(sql);
    await connection.end();
  },

  /**
   * 会員の詳細情報を更新
   */
  update: async function (id, name, loginId, password, gender, birthday, address, mail, tel) {
    // sql
    const sql = `UPDATE users SET US_name = '${name}', US_login_id = '${loginId}', US_password = '${password}', US_gender = '${gender}', US_birthday = ${birthday}, US_address = '${address}', US_mail = '${mail}', US_tel = '${tel}' WHERE US_id = ` + id;
    // select実行
    const connection = await mysql.createConnection(dbConf);
    await connection.query(sql);
    await connection.end();
  },

  /**
   * 会員をBAN
   */
  ban: async function (id) {
    // sql
    const sql = `UPDATE users SET US_ban = 1 WHERE US_id = ` + id;
    // select実行
    const connection = await mysql.createConnection(dbConf);
    await connection.query(sql);
    await connection.end();
  }

}
// .insert("hal", "hal", "hal", "M", 19991212, "大阪市", "hal@hal.ac.jp", "09099998888")
// .update(2, "hal", "hal", "hal", "F", 19991212, "吹田市", "hal@hal.ac.jp", "09099998888")
.ban(2)
// .findAll()
;

// INSERT INTO users (US_name, US_login_id, US_password, US_gender, US_birthday, US_address, US_mail, US_tel, US_ban) VALUES("hal","hal","hal","M",19991212,"大阪市","hal@hal.ac.jp",09099998888,0);
