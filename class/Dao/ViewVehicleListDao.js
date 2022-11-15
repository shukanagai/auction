const mysql = require('mysql2/promise');

const dbConf = require('../../config').dbConfig;

module.exports = {
  /**
   * 車両一覧画面に必要なデータ
   */
  getVehicleList: async function () {
    // sql
    const sql = "SELECT * FROM view_vehicle_list";

    // select実行
    const connection = await mysql.createConnection(dbConf);
    const [rows, fields] = await connection.execute(sql);
    await connection.end();

    /**
     * データの加工処理&データ返す処理
     */
    console.log(rows);
    console.log(fields);
  }
}