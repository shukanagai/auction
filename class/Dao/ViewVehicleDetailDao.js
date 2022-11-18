const mysql = require('mysql2/promise');

const dbConf = {
  host: '3.115.111.52',
  user: 'auction',
  password: 'tokoro',
  database: 'auction'
};

module.exports = {
  /**
   * 車両詳細画面に必要なデータ
   */
  getVehicleDetail: async function (auctionId) {
    // sql
    const sql = `SELECT * FROM view_vehicle_detail WHERE auctionId = ${auctionId}`;
    // select実行
    const connection = await mysql.createConnection(dbConf);
    const [rows, fields] = await connection.execute(sql);
    await connection.end();

    /**
     * データの加工処理&データ返す処理
     */
  },

  /**
   * 車両新規登録画面のセレクトボックス用メーカー一覧を取得する
   */
  getMakerList: async function () {
    // sql
    const sql = `SELECT * FROM makers`;
    // select実行
    const connection = await mysql.createConnection(dbConf);
    const [rows, fields] = await connection.execute(sql);
    await connection.end();

    /**
     * データの加工処理&データ返す処理
     */
  }

}