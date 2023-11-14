# Snacks
## 概要
CC-API-Soroプロジェクトで作成した「Snacks」のAPIドキュメントです。

## 機能
- お菓子の情報取得・編集

## プロトコル
REST

## リクエストURL
http//localhost:3000

## API仕様

||メソッド|URI|備考|
|---|---|---|---|
|お菓子情報の取得|GET|/api/v1/snacks|クエリパラメータでlimitを指定することで表示上限指定可|
|コメントに含まれるキーワードで検索|GET|/api/v1/snacks?keyword|クエリパラメータでlimitを指定することで表示上限指定可|
|お菓子情報の追加|POST|/api/v1/snacks|全項目入力必須|
|お菓子情報の編集|PUT|/api/v1/snacks/:id|ID必須。一部情報でも更新可|
|お菓子情報の削除|DELETE|/api/v1/snacks/:id||