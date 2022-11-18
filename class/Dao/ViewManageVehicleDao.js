const mysql = require('mysql2/promise');

const dbConf = require('../../config').dbConfig;

module.exports = {
  /**
   * 車両一覧画面に必要なデータ
   */
  findAll: async function () {
    // sql
    const sql = "SELECT * FROM view_manage_vehicle";

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
  findByPK: async function (id) {
    // sql
    const sql = `SELECT * FROM view_manage_vehicle WHERE car_id = ` + id;
    // select実行
    const connection = await mysql.createConnection(dbConf);
    const [rows, fields] = await connection.execute(sql);
    await connection.end();

    /**
     * データの加工処理&データ返す処理
     */
  }


}