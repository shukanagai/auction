const mysql = require('mysql2/promise');

const dbConf = require('../../config').dbConfig;

module.exports = {
  /**
   * 車両一覧画面に必要なデータ
   */
  findAll: async function () {
    // sql
    const sql = "SELECT * FROM view_manage_vehicles";

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
  * PKから車両の詳細情報を選択
  */
  findByPK: async function (id) {
    // sql
    const sql = `SELECT * FROM view_manage_vehicles WHERE car_id = ` + id;
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
   * 検索条件から車両の詳細情報を選択
   */
  findByName: async function (name, maker, color, passenger) {
    // sql
    const sql = `SELECT * FROM view_manage_vehicles`;
    sql += ` WHERE car_name LIKE '%${name}%'`;
    if(maker != null) sql += ` AND car_maker = ${maker}`;
    if(color != null) sql += ` AND car_color = ${color}`;
    if(passenger != null) sql += ` AND car_passenger = ${passenger}`;
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