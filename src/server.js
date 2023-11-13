const { setupServer } = require("./server");

const server = setupServer();

const PORT = process.env.PORT || 3000;
server.listen(PORT,() =>{
    console.log("Server listning on Port", PORT);
});