const request = require("supertest");

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("Register", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("Should register with valid credentials", async () => {
    const user = await factory.create("User", {
      password: "123123"
    })

    const response = await request(app)
    .post("/register")
    .send({
      name: user.name,
      email: user.email,
      password: "123123"
    });

    expect(response.status).toBe(200);
  });

  it("Should not register without credentials", async () => {
    const response = await request(app)
    .post("/register")
    .send({
      name: "",
      email: "",
      password: ""
    });

    try {
      await factory.create("User", {
        name: "",
        email: "",
        password: ""
      })
    } catch(err) {
      expect(response.status).toBe(401);
    }
  });

  it("Should not register with existent email", async () => {
    const user = await factory.create("User", {
      password: "123123"
    })

    const response = await request(app)
    .post("/register")
    .send({
      name: user.name,
      email: user.email,
      password: "123123"
    });

    try {
      await factory.create("User", {
        email: user.email,
        password: "123123"
      });
    } catch(err) {
      expect(response.status).toBe(401);
    }
  });
});