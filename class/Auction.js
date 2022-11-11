module.exports = class Auction {
  constructor(){
    // 車の名前
    this._carName = null;
    // 車のメーカー
    this._catMaker = null;
    // 車の車種
    this._carModel = null;
    // 車の乗車定員数
    this._carCapacity = null;
    // 車の走行年数
    this._carDrivingYears = null;
    // 車の走行距離
    this._carMileage = null;
    // 車のベースカラー
    this._carBaseColor = null;
    // 車の画像ファイルパス
    this._carImgPath = null;
    // オークション開始日時
    this._auctionStartDateTime = null;
    // オークション開始価格
    this._auctionStartPrice = null;
  }
}