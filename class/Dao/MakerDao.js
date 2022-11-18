const mysql = require('mysql2/promise');

const dbConf = require('../../config').dbConfig;

module.exports = {
   /**
    * 車両新規登録画面のセレクトボックス用メーカー一覧を取得する
    */
   findAll: async function () {
      // sql
      const sql = `SELECT * FROM makers`;
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
      const sql = `SELECT * FROM makers WHERE car_id = ` + id;
      // select実行
      const connection = await mysql.createConnection(dbConf);
      const [rows, fields] = await connection.execute(sql);
      await connection.end();

      /**
       * データの加工処理&データ返す処理
       */
   }
}