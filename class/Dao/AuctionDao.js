const mysql = require('mysql2/promise');

const dbConf = require('../../config').dbConfig;
const ADMIN_USER_ID = 2;

// date_formatした全カラム
const all = "AU_vehicle_id, AU_user_id, DATE_FORMAT(AU_start_datetime, '%Y-%m-%d %H:%i:%s') AS AU_start_datetime, DATE_FORMAT(AU_end_datetime, '%Y-%m-%d %H:%i:%s') AS AU_end_datetime, AU_start_price, AU_end_price"

module.exports = {
  /**
   * オークション情報一覧を選択
   */
  findAll: async function () {
    // sql
    // const sql = `SELECT * FROM auctions`;
    const sql = `SELECT ${all} FROM auctions`;
    // select実行
    const connection = await mysql.createConnection(dbConf);
    const [rows, fields] = await connection.execute(sql);
    await connection.end();
    /**
     * データの加工処理&データ返す処理
     */
    return rows;
  },

  /**
   * PK(車両ID)からオークション情報を選択
   */
  findByPK: async function (id) {
    // sql
    const sql = `SELECT ${all} FROM auctions WHERE AU_vehicle_id = ` + id;
    // select実行
    const connection = await mysql.createConnection(dbConf);
    const [rows, fields] = await connection.execute(sql);
    await connection.end();
    /**
     * データの加工処理&データ返す処理
     */
    return rows;
  },

  /**
   * ユーザーIDからオークション情報を選択
   */
  findByUserID: async function (id) {
    // sql
    const sql = `SELECT * FROM auctions WHERE AU_user_id = ` + id;
    // select実行
    const connection = await mysql.createConnection(dbConf);
    const [rows, fields] = await connection.execute(sql);
    await connection.end();
    /**
     * データの加工処理&データ返す処理
     */
    return rows;
  },

  /**
   * オークション情報を新規登録
   */
  insert: async function (vehicleId, startDatetime, startPrice, endDatetime) {
    // sql
    const sql = `INSERT INTO auctions (AU_vehicle_id, AU_user_id, AU_start_datetime, AU_start_price, AU_end_datetime, AU_end_price) VALUES(${vehicleId}, ${ADMIN_USER_ID}, '${startDatetime}', ${startPrice}, '${endDatetime}', -1)`;
    // insert実行
    const connection = await mysql.createConnection(dbConf);
    await connection.query(sql);
    await connection.end();
  },

  /**
   * オークション情報を更新
   */
  update: async function (vehicleId, startDatetime, startPrice, endDatetime) {
    // sql
    const sql = `UPDATE auctions SET AU_start_datetime = ${startDatetime}, AU_start_price = ${startPrice}, AU_end_datetime = ${endDatetime} WHERE AU_id = ${vehicleId}`;
    // select実行
    const connection = await mysql.createConnection(dbConf);
    await connection.query(sql);
    await connection.end();
  },

  /**
   * 落札した時の更新
   */
  sold: async function (vehicleId, userId, endPrice) {
    // sql
    const sql = `UPDATE auctions SET AU_user_id = '${userId}', AU_end_price = '${endPrice} WHERE AU_id = ${vehicleId}`;
    // select実行
    const connection = await mysql.createConnection(dbConf);
    await connection.query(sql);
    await connection.end();
  }
}