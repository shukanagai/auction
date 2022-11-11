module.exports = class Auction {
  constructor() {
    // オークションid
    this._auctionId = null;
    // 車両id
    this._carId = null;
    // 落札者id
    this._purchaserId = null;
    // オークション開始日時
    this._auctionStartDateTime = null;
    // オークション終了日時
    this._auctionEndDateTime = null;
    // オークション開始価格
    this._auctionStartPrice = null;
    // オークション終了価格
    this._auctionEndPrice = null;
  }
}