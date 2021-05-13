const bcrypt = require("bcryptjs");

const { User } = require("../../src/app/models");
const truncate = require("../utils/truncate");

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  })

  it("Should encrypt user password", async () => {
    const user = await User.create({
      name: "Leandro",
      email: "leandro@gmail.com",
      password: "123456"
    });

    const compare_hash = await bcrypt.compare('123456', user.password_hash);

    expect(compare_hash).toBe(true);
  })
})