const mysql = require('mysql2/promise');

const dbConf = require('../../config').dbConfig;

module.exports = {
  /**
  * PKから車両の詳細情報を選択
  */
  findByPK: async function (id) {
    // sql
    const sql = `SELECT * FROM vehicles WHERE V_id = ` + id;
    // select実行
    const connection = await mysql.createConnection(dbConf);
    const [rows, fields] = await connection.execute(sql);
    await connection.end();
    // データの加工処理&データ返す処理
    return rows[0];
  },

  /**
   * 車両の基本情報を新規登録
   */
  insert: async function (name, makerId, mileage, colorId, transmission, bodyTypeId, passenger, handle, imageFileName) {
    const connection = await mysql.createConnection(dbConf);
    // insert実行
    let sql = `INSERT INTO vehicles (V_name, V_maker_id, V_mileage, V_color_system_id, V_transmission, V_body_type_id, V_delete_flag) VALUES('${name}', ${makerId}, ${mileage}, ${colorId}, ${transmission}, ${bodyTypeId}, 0)`;
    const [rows] = await connection.query(sql);
    // insert実行
    sql = `INSERT INTO vehicle_details (VD_vehicle_id, VD_passenger, VD_handle) VALUES('${rows.insertId}', ${passenger}, '${handle}')`;
    await connection.query(sql);
    sql = `INSERT INTO vehicle_images (VI_vehicle_id, VI_no, VI_file_path) VALUES ('${rows.insertId}', 1, '${imageFileName}')`;
    await connection.query(sql);
    await connection.end();
    return rows.insertId;
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
    sql = `UPDATE vehicle_details SET VD_passenger = '${passenger}' WHERE VD_Vehicle_id = ` + id;
    await connection.query(sql);
    await connection.end();
  },

  /**
   * 車両の情報を論理削除
   */
  delete: async function (id) {
    // sql
    const sql = `UPDATE vehicles SET V_delete_flag = 1 WHERE V_id = ` + id;
    // select実行
    const connection = await mysql.createConnection(dbConf);
    await connection.query(sql);
    await connection.end();
  },

  /**
   * 車両の詳細情報を新規登録
   * 使わないでよい
   */
  insertAll: async function (name, makerId, mileage, colorId, passenger) {
    const connection = await mysql.createConnection(dbConf);
    // insert実行
    let sql = `INSERT INTO vehicles (V_name, V_maker_id, V_mileage, V_color_system_id, V_delete_flag) VALUES('${name}', ${makerId}, ${mileage}, ${colorId}, 0)`;
    const [rows] = await connection.query(sql);
    // insert実行
    sql = `INSERT INTO vehicle_details (VD_vehicle_id, VD_passenger) VALUES('${rows.insertId}', ${passenger})`;
    await connection.query(sql);
    await connection.end();
  }

  /**
   * 車両の詳細情報を更新
   * 使わないでよい
   */


}