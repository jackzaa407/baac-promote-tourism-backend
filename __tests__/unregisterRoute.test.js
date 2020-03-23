const supertest = require("supertest");
const mongoose = require("mongoose");
const { app, startdb } = require("../src/DBConnection/mongoose");
const jwt = require('../src/utils/genJwtToFrontend')
const encrypt = require('../src/utils/encrypt')
const nock = require("nock");

const {
  mockCheckCardType,
  mockCheckRefCode,
  mockConsent,
  mockNotiSend
} = require("../mocks/mockApi");
nock.enableNetConnect(/(localhost|127\.0\.0\.1)/);

beforeEach(async () => {
  await startdb();
  mockCheckCardType();
  mockCheckRefCode();
  mockConsent();
  mockNotiSend();
  
  await supertest(app)
  .post("/register")
  .set({ 'Authorization': 'bearer ' + jwt()})
  .send({
    phone: encrypt("0823456777"),
    citizenId: encrypt("2234567891777"),
    refCode: "1234567"
  });
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany();
  }
  nock.cleanAll();
  await mongoose.connection.close();
});

test("check unregister ", async () => {
  const response = await supertest(app)
    .post("/unregister")
    .set({ 'Authorization': 'bearer ' + jwt()})
    .send({
      phone: encrypt("0823456777"),
      citizenId: encrypt("2234567891777"),
      refCode: "1234567"
    });

  expect(response.body.msg).toBe("Unregister success");
  expect(response.status).toBe(200);
});