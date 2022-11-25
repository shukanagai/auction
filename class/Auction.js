module.exports = class Auction {
  constructor() {
    // オークションid
    this._id = null;
    // 落札者id
    this._purchaserId = null;
    // オークション開始日時
    this._startDateTime = null;
    // オークション終了日時
    this._endDateTime = null;
    // オークション開始価格
    this._startPrice = null;
    // オークション現在価格
    this._nowPrice = null;
    // オークション終了価格
    this._endPrice = null;

    // 車両情報を含むCarオブジェクト
    this._car = null;
  }
}