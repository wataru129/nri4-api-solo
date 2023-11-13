const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();
const {setupServer} = require("../src/server");

const server = setupServer();

describe("セットアップテスト", () => {
    it("Get Status 200", async () => {
        let request = chai.request(server);
        const res = await request.get("/");
        res.should.have.status(200);
    });
});