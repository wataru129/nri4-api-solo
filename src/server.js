const express = require("express");
const knex = require("./knex");
const { Client } = require("pg");
const client = new Client({
  host: "127.0.0.1",
  database: "nri4-api-solo",
  user: "postgres",
  password: "postgres",
  port: 5432,
});


const setupServer = () => {
    client.connect();
    const app = express();
    app.use(express.json());
    app.get("/-/healthcheck", (req, res) => {
        res.status(200).send("Hello World");
    });
    app.get("/snacks", (req, res) => {
        console.log(req.query);
        if (Object.keys(req.query).length === 0){
            const query = {
                text: "SELECT * FROM snack",
            };
            client
            .query(query)
            .then((resDB) => {
                // console.log(resDB)
                res.status(200).json(resDB.rows);
            })
            .catch((e) => {
                console.error(e.stack);
                res.status(400).send(e.stack)
            });     
        }else{
            const query = {
                text: "SELECT * FROM snack WHERE comment LIKE $1",
                values: ['%' + req.query.search + '%']
            };            
            client
            .query(query)
            .then((resDB) => {
                // console.log(resDB)
                res.status(200).json(resDB.rows);
            })
            .catch((e) => {
                console.error(e.stack);
                res.status(400).send(e.stack)
            });            
        };
    });
    app.post("/snacks", (req, res) => {
        const query = {
            text: 'INSERT INTO snack(name, kana, maker, price, type, regist, url, tags, image, comment)  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            values: [
                req.body["name"],
                req.body["kana"],
                req.body["maker"],
                req.body["price"],
                req.body["type"],
                req.body["regist"],
                req.body["url"],
                req.body["tags"],
                req.body["image"],
                req.body["comment"],
            ],
        };
    //   const query = {
    //     text: "select setval('snack_id_seq',(select max(id) from snack))",
    //   };
        client
        .query(query)
        .then((resDB) => {
            console.log(resDB.rows[0].id);
            res.status(200).send((resDB.rows[0].id).toString());
        })
        .catch((e) => {
            console.error(e.stack);
            res.status(400).send(e.stack)
        });
    
    });
    app.put("/snacks/:id", (req, res) => {
        const queryId = req.params.id;
        const updates = req.body;
        const keyList = Object.keys(updates);
        // クエリのSET部分を動的に構築
        const setString = keyList.map((key, index) => `${key} = $${index + 1}`).join(", ");
        // バインドする値の配列を作成
        const values = [...keyList.map(key => updates[key]), queryId];
        // SQLクエリの構築
        const query = {
            text: `UPDATE snack SET ${setString} WHERE id = $${keyList.length + 1} RETURNING *`,
            values: values
        };
        client
        .query(query)
        .then((resDB) => {
            // console.log(resDB.rows);
            res.status(200).send("OK");
        })
        .catch((e) => {
            console.error(e.stack);
            res.status(400).send("ERROR");
        });    
    });
    app.delete("/snacks/:id", (req, res) => {
        const queryId = req.params.id;
        const query = {
            text: 'DELETE FROM snack WHERE id=$1',
            values: [queryId],
        };
        client
        .query(query)
        .then((resDB) => {
            res.status(200).send("OK");
        })
        .catch((e) => {
            console.error(e.stack);
            res.status(400).send("ERROR");
        });
        
    });
    
    return app;
};
module.exports = { setupServer };
