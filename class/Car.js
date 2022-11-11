module.exports = class Car {
  constructor() {
    // db上のid
    this._carId = null;
    // 車の車種名
    this._carName = null;
    // 車のメーカー
    this._carMaker = null;
    // 車の乗車定員数
    this._carPassenger = null;
    // 車の走行年数
    this._carModelYear = null;
    // 車の走行距離
    this._carMileage = null;
    // 車のベースカラー
    this._carBaseColor = null;
    // 車の画像ファイルパス
    this._carImgPath = null;
  }
}