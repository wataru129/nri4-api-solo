const express = require("express");
const setupServer = () =>{
    const app = express();
    app.use(express.json());
    app.get('/', (req, res) => {
        res.status(200).send('Hello World');
    });
    return app;
};
module.exports = { setupServer };