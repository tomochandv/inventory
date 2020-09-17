const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/server/index");
const expect = chai.expect;

chai.use(chaiHttp);

describe("post /login", () => {
  before(function () {
    console.log('before hook');
  });

  it("1.로그인", done => {
    chai
      .request('http://localhost:4010').keepOpen()
      .post("/login")
      .send({
        email: 'aka.tomochan@gmail.com',
        pwd: '111111',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.result).to.equal(true, 'login success');
        // expect(res.body.result).to.equal(false, 'login false');
        done();
      });
  });
});

describe("post /register", () => {
  before(function () {
    console.log('before hook');
  });

  it("1.회원가입", done => {
    chai
      .request('http://localhost:4010').keepOpen()
      .post("/register")
      .send({
        email: 'aka.tomochan1@gmail.com',
        pwd: '111111',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.result).to.equal(true, 'register success');
        done();
      });
  });
});