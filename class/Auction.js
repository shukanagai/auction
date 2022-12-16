const AuctionDao = require("./Dao/AuctionDao");

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

    this.users = [];

    this.setSocket(io);

    io.on('connection', async (socket) => {

      /**
       * オークション情報がない場合、参照し保存
       */
      if (this._vehicleId == null) {
        const res = await this.findNowAuction();

        if (res) {
          this.timer();
        }
      }

      /**
       * updatePrice
       */
      socket.on('updatePrice', async (data) => {
        console.log(data);
        // 更新判定
        if (data.price && this._nowPrice < data.price) {
          // DB価格更新処理(戻り値は更新レコード数)
          const result = await AuctionDao.updatePrice(data.price, data.userId, this._vehicleId);

          if (result == 1) {
            this.io.emit('updatePrice', { price: data.price });
            this._nowPrice = data.price;
          } else {
            this.io.emit('updatePriceFail', { errorMsg: '価格の更新に失敗しました。' });
          }
        } else {
          this.io.emit('updatePriceFail', { errorMsg: '更新に失敗しました。' });
        }
      });

    });
  }

  async findNowAuction() {
    // 現在進行中のオークション情報をフィールドに保存
    const au = await AuctionDao.findNowAuction();

    if (!au) {
      return false;
    }

    this._vehicleId = au.AU_vehicle_id;
    this._purchaserId = au.AU_user_id;
    this._startDateTime = au.AU_start_datetime;
    this._endDateTime = au.AU_end_datetime;
    this._startPrice = au.AU_start_price;
    this._nowPrice = au.AU_end_price;

    return true;
  }

  timer() {
    // 終了日時
    const endTime = new Date(this._endDateTime);
    let now;
    let diff;

    const timer = setInterval(() => {
      // 現在日時
      now = new Date();
      if (endTime < now) {
        // timerOverソケットを飛ばす
        this.io.emit('timeOver', { vehicleId: this._vehicleId });

        // フィールドをクリア
        this._vehicleId = null;
        this._purchaserId = null;
        this._startDateTime = null;
        this._endDateTime = null;
        this._startPrice = null;
        this._nowPrice = null;
        clearInterval(timer);
      } else {
        diff = endTime - now;
        this.io.emit('timer', { diff: diff });
      }
    }, 1000);
  }

  setSocket(io) {
    this.io = io;
  }
}