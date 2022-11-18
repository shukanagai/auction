const mysql = require('mysql2/promise');

const dbConf = {
  host: '3.115.111.52',
  user: 'auction',
  password: 'tokoro',
  database: 'auction'
};

module.exports = {
  /**
   * 売上管理に必要なデータ
   */
  getSaleList: async function () {
    // sql
    const sql = `SELECT * FROM view_manage_sales`;
    // select実行
    const connection = await mysql.createConnection(dbConf);
    const [rows, fields] = await connection.execute(sql);
    await connection.end();

    /**
     * データの加工処理&データ返す処理
     */
  },

  /**
   * 売上管理に必要なデータ（詳細情報）
   */
  getSaleList: async function (id) {
    // sql
    const sql = `SELECT * FROM view_sales_management`;
    // select実行
    const connection = await mysql.createConnection(dbConf);
    const [rows, fields] = await connection.execute(sql);
    await connection.end();

    /**
     * データの加工処理&データ返す処理
     */
  }
}