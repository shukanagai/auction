const mysql = require('mysql2/promise');

const dbConf = require('../../config').dbConfig;

module.exports = {
  /**
   * 車両の基本情報を新規登録
   */
  insert: async function (name, makerId, mileage, colorId, passenger) {
    const connection = await mysql.createConnection(dbConf);
    // insert実行
    let sql = `INSERT INTO vehicles (V_name, V_maker_id, V_mileage, V_color_system_id, V_delete_flag) VALUES('${name}', ${makerId}, ${mileage}, ${colorId}, 0)`;
    const [rows] = await connection.query(sql);
    // insert実行
    sql = `INSERT INTO vehicle_details (VD_vehicle_id, VD_passenger) VALUES('${rows.insertId}', ${passenger})`;
    await connection.query(sql);
    await connection.end();
  },

  /**
   * 車両の基本情報を更新
   */
  update: async function (id, name, makerId, colorId, passenger) {
    const connection = await mysql.createConnection(dbConf);
    // select実行
    let sql = `UPDATE vehicles SET V_name = '${name}', V_maker_id = '${makerId}', V_color_system_id = '${colorId}' WHERE V_id = ` + id;
    await connection.query(sql);
    // select実行
    sql = `UPDATE vehicle_details SET VD_passenger = '${passenger}' WHERE VD_id = ` + id;
    await connection.query(sql);
    await connection.end();
  },

  /**
   * 車両の詳細情報を更新
   */

  /**
   * 車両の詳細情報を更新
   */
  delete: async function (id) {
    // sql
    const sql = `UPDATE vehicles SET V_delete_flag = 1 WHERE V_id = ` + id;
    // select実行
    const connection = await mysql.createConnection(dbConf);
    await connection.query(sql);
    await connection.end();
  }
}