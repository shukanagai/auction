const mysql = require('mysql2/promise');

const dbConf = require('../../config').dbConfig;

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
  },

  /**
   * PKから会員の詳細情報を選択
   */
  findUserByPK: async function (id) {
    // sql
    const sql = `SELECT * FROM users WHERE id = ` + id;
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
  update: async function (id, name, loginId, password, gender, birthday, address, mail, tel) {
    // sql
    const sql = `UPDATE users SET US_name = ${name}, US_name = ${name}, US_login_id = ${loginId}, US_password = ${password}, US_gender = ${gender}, US_birthday = ${birthday}, US_address = ${address}, US_mail = ${mail}, US_tel = ${tel}, WHERE id = ` + id;
    // select実行
    const connection = await mysql.createConnection(dbConf);
    const [rows, fields] = await connection.execute(sql);
    await connection.end();

    /**
     * データの加工処理&データ返す処理
     */
  },

  /**
   * 会員をBAN
   */
  ban: async function (id) {
    // sql
    const sql = `UPDATE users SET US_ban = 1 WHERE id = ` + id;
    // select実行
    const connection = await mysql.createConnection(dbConf);
    const [rows, fields] = await connection.execute(sql);
    await connection.end();

    /**
     * データの加工処理&データ返す処理
     */
  }

}