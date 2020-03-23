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
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany();
  }
  nock.cleanAll();
  await mongoose.connection.close();
});

test("test register DebitHolder pass", async () => {
  const response = await supertest(app)
    .post("/register")
    .set({ 'Authorization': 'bearer ' + jwt()})
    .send({
      phone: encrypt("0823456789"),
      citizenId: encrypt("1234567891289"),
      refCode: "1234567"
    });
  expect(response.status).toEqual(201);
});
