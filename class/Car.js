module.exports = class Car {
  constructor() {
    // db上のid
    this._id = null;
    // 車の車種名
    this._name = null;
    // 車のメーカー
    this._maker = null;
    // 車の乗車定員数
    this._passenger = null;
    // 車の走行年数
    this._modelYear = null;
    // 車の走行距離
    this._mileage = null;
    // 車のベースカラー
    this._baseColor = null;
    // 車の画像ファイルパス
    this._imgPath = null;
  }
}