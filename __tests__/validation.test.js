const supertest = require("supertest");
const mongoose = require("mongoose");
const { app, startdb } = require("../src/DBConnection/mongoose");
const jwt = require('../src/utils/genJwtToFrontend')
const encrypt = require('../src/utils/encrypt')
const nock = require("nock");
nock.enableNetConnect(/(localhost|127\.0\.0\.1)/);
const {
  mockCheckCardType,
  mockCheckRefCode,
  mockConsent,
  mockNotiSend
} = require("../mocks/mockApi");

beforeEach(async () => {
  await startdb();
  mockCheckCardType();
  mockCheckRefCode();
  mockConsent();
  mockNotiSend();
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany();
  }
  nock.cleanAll();
  await mongoose.connection.close();
});

test("unit test validator phone number", async () => {
  const response = await supertest(app)
    .post("/register")
    .set({ 'Authorization': 'bearer ' + jwt()})
    .send({
      phone: encrypt("01234567-9"),
      citizenId: encrypt("1234567891289"),
      refCode: "1234567"
    });

  expect(response.body.msg).toEqual("invalid format");
});

test("unit test validator cirtizenId", async () => {
  const response = await supertest(app)
    .post("/register")
    .set({ 'Authorization': 'bearer ' + jwt()})
    .send({
      phone: encrypt("0123456789"),
      citizenId: encrypt("123456+891289"),
      refCode: "1234567"
    });

  expect(response.body.msg).toEqual("invalid format");
});

test("unit test validator refCode", async () => {
  const response = await supertest(app)
    .post("/register")
    .set({ 'Authorization': 'bearer ' + jwt()})
    .send({
      phone: encrypt("01234567-9"),
      citizenId: encrypt("1234567891289"),
      refCode: "123567"
    });

  expect(response.body.msg).toEqual("invalid format");
});
