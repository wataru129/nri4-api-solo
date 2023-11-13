const express = require("express");
const setupServer = () =>{
    const app = express();
    app.get('/', (res, req) => {
        res.send('Hello World');
    });
};