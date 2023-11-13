const chai = require("chai");
const chaiHttp = require("chai-http");2
chai.use(chaiHttp);
chai.should();
const {setupServer} = require("../src/server");

const testData = require("./testData.json");

const server = setupServer();

describe("ヘルスチェック", () => {
    it("Get Status 200", async () => {
        let request = chai.request(server);
        const res = await request.get("/-/healthcheck");
        res.should.have.status(200);
    });

});

describe("snack api", () => {
    let request;
    let postId;
    beforeEach(() => {
      request = chai.request(server);
    });
    describe("GET", () => {
        it("Get ALL ITEMS", async () => {
            const res = await request.get("/snacks");
            res.should.have.status(200);
            JSON.parse(res.text).length.should.equal(66);
        });
        it("Get ITEMS filter comment", async () => {
            const queryParam = "おいしい";
            const encodedQueryParam = encodeURIComponent(queryParam);
            const res = await request.get("/snacks?search=" + encodedQueryParam );
            res.should.have.status(200);
            JSON.parse(res.text).length.should.equal(4);
        });
    });
    describe("POST", () => {
        it("POST ITEM", async () => {
            const res = await request
            .post("/snacks")
            .send(testData["item"]);
            postId = res.text;
            res.should.have.status(200);
            // result["id"].should.equal(67);
        });
    });
    describe("PATCH/PUT", () => {
        it("PUT ITEM", async () => {
            const res = await request
            .put("/snacks/" + postId)
            .send(testData["update_item"]);
            res.should.have.status(200);
        });
    });
    describe("DELETE", () => {
        it("DELETE ITEM", async () => {
            let request = chai.request(server);
            // const res = await request.delete("/snacks/82");
            const res = await request.delete("/snacks/" + postId);
            res.should.have.status(200);
        });
    });
});

