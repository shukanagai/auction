const mysql = require('mysql2/promise');

const dbConf = {
  host: '3.115.111.52',
  user: 'auction',
  password: 'tokoro',
  database: 'auction'
};

module.exports = {
  /**
   * 会員管理に必要なデータ
   */
  findUserList: async function () {
    // sql
    const sql = `SELECT * FROM users`;
    // select実行
    const connection = await mysql.createConnection(dbConf);
    const [rows, fields] = await connection.execute(sql);
    await connection.end();

    /**
     * データの加工処理&データ返す処理
     */
  }

}