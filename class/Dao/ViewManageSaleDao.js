const mysql = require('mysql2/promise');

const dbConf = require('../../config').dbConfig;

module.exports = {
  /**
   * 売上管理に必要なデータ一覧を選択
   */
  findAll: async function () {
    // sql
    const sql = `SELECT * FROM view_manage_sales`;
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
   * PKから売上管理に必要なデータを選択
   */
  findByPK: async function (id) {
    // sql
    const sql = `SELECT * FROM view_manage_sales WHERE car_id = ` + id;
    // select実行
    const connection = await mysql.createConnection(dbConf);
    const [rows, fields] = await connection.execute(sql);
    await connection.end();
    /**
     * データの加工処理&データ返す処理
     */
    return rows;
  }
}