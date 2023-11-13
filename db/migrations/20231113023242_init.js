/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('snack')
    .then(function(exists) {
      if (!exists) {
           // 接続先のスキーマに指定した名前でテーブルを作成する
          return knex.schema.createTable('snack', 
            // 作成したテーブルにカラムを作成する
            function(table) {
               // テーブルの要素設定 別途記載
              table.increments('id').primary();
              table.string('name', 100);
              table.string('kana', 100);
              table.string('maker', 100);
              table.integer('price');
              table.string('type', 100);
              table.string('regist', 100);
              table.string('url', 1000);
              table.string('area', 100);
              table.string('tags', 1000);
              table.string('image', 1000);
              table.string('comment', 1000);
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
    return knex.schema.hasTable('snack').then(function(exists) {
        if (exists) {
            // 指定したテーブルを削除する
            return knex.schema.dropTable('snack');
        }
    }); 
};
