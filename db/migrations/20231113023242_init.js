/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('テーブル名')
    .then(function(exists) {
      if (!exists) {
           // 接続先のスキーマに指定した名前でテーブルを作成する
          return knex.schema.createTable('テーブル名', 
            // 作成したテーブルにカラムを作成する
            function(table) {
               // テーブルの要素設定 別途記載
              table.increments('id').primary();
              table.string('name', 100);
              table.integer('price');
          });
      }else{
          return new Error("The table already exists. 2");
      }
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.hasTable('テーブル名').then(function(exists) {
        if (exists) {
            // 指定したテーブルを削除する
            return knex.schema.dropTable('テーブル名');
        }
    }); 
};
