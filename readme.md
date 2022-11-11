# manabo-chatのリポジトリです
このリポジトリはU22チーム制作「manabo chat」のgithub共有リポジトリです。  
注意点や設計ルールなどはこのreadmeファイルを参考にしてください。  
また誰でも、このファイルに加筆することが可能です。
<br>
# ルーティング
ページを追加するにはルーティングの設定を行う必要があります。
<br>

## 1．ejsファイルをviewsファイルに追加
viewsファイルにejsファイルを追加します。ejsとはPHPのようにプログラムで処理した変数の情報などを埋め込むことが出来るようにJS版に用意されたテンプレートファイル形式のことです。ejsで使用できるタグに関しては[こちら](https://qiita.com/y_hokkey/items/31f1daa6cecb5f4ea4c9)を参考にしてください。

## ２．ルーティング先ごとの処理を追記する
ページごとの固有の処理はrouteフォルダ内に用意しています。  
今回はsample.jsの中身を見てみます  
``` JavaScript
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sample');
});

module.exports = router;
```

とりあえず、こんな記述をするんだでOKです。難しく感じる部分はプログラム担当の人に質問してください。
<br>

## 3.　ルーティングの処理を書く
<br>
最後にapp.jsの内容を書き加えます。  
書き加えるべきポイントは２点です。  
<br>
<br>
①ルートごとの処理を読みこむ（②番で作成したファイルのパスを記述）

``` JavaScript
var sampleRouter = require('./routes/sample');
```
<br>
②おまじない

``` JavaScript
app.use('/sample', sampleRouter);
```
<br>

## 4.　アクセス方法
<br>
コマンドライン上に以下のどれかを打ち込み実行します

```コマンドライン 
$ npm start
```

```コマンドライン 
$ node bin/www
```

以下のコマンドはCSSやJSの変更を動的に適応してくれます。

```コマンドライン 
$ npm start
```

<br>

いずれのコマンドを実行した場合でも、以下のリンクをURLに打ち込むことで上記の操作で追加したサンプルページにアクセスすることができます。
``` 
http://localhost:3000/sample
```