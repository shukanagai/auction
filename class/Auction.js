module.exports = class Auction {
  constructor(io) {
    // オークションの車両id
    this._vehicleId = null;
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

    this.io = io;

    io.on('connection', (socket) => {
      socket.on('updatePrice', (data) => {
        // 更新判定
        if (this._startPrice < data.price) {
          // todo 2022/12/12
          // DB価格更新処理
          this.io.emit('updatePrice', { price: data.price });
        } else {
          this.io.emit('updatePriceFail', { errorMsg: '更新に失敗しました。' });
        }
      })
    });
  }

  async updateAuction(){
    // 現在進行中のオークション情報をフィールドに保存
  }
}