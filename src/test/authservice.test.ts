import * as db from "./db";
import { validateAndCreateToken } from "../services/auth";
import { addUser, getUser, editUser } from "../services/user";
import { ROLES } from "../models/user";
import { encodePassword } from "../services/auth";

beforeAll(async () => {
  await db.connectDB();
});

afterAll(async () => {
  await db.dropDB();
});

afterEach(async () => {
  await db.dropCollections();
});

describe("Auth service", () => {
  it("Error should be thrown since the user does not exist", async () => {
    await expect(
      validateAndCreateToken("test@test.com", "password")
    ).rejects.toThrow();
  });

  it("Error should be thrown by wrong password", async () => {
    await addUser("Test", "test@test.com", true, "password");
    await expect(
      validateAndCreateToken("test@test.com", "wrongpassword")
    ).rejects.toThrow();
  });

  it("Token should be created successfuly", async () => {
    await addUser("Test", "test@test.com", true, "password");
    const token = await validateAndCreateToken("test@test.com", "password");
    expect(token).toBeDefined();
  });
});
