import * as db from "./db";
import { addUser, getUser, editUser, getAllUsers } from "../services/user";
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

describe("User controller", () => {
  it("User should be created", async () => {
    const user = await addUser("Test", "test@test.com", true, "password");
    const encodedPassword = await encodePassword("password");

    expect(user?._id).toBeDefined();
    expect(user?.name).toBe("Test");
    expect(user?.email).toBe("test@test.com");
    expect(user?.role).toBe(ROLES.STUDENT);
    expect(user?.password).toBe(encodedPassword);
  });

  it("User with existing email should not be created", async () => {
    const existingUser = await addUser(
      "Test",
      "test@test.com",
      true,
      "password"
    );
    expect(existingUser).not.toBeNull();

    await expect(
      addUser("Test2", "test@test.com", true, "password")
    ).rejects.toThrow();
  });

  it("User should updated", async () => {
    const user = await addUser("Test", "test@test.com", true, "password");
    expect(user).not.toBeNull();
    if (user !== null) {
      user.name = "Updated name";
      user.email = "test2@test.com";
      await editUser(user);
      const result = await getUser(user._id);
      expect(result?.name).toBe("Updated name");
      expect(result?.email).toBe("test2@test.com");
      expect(result?.role).toBe(ROLES.STUDENT);
    }
  });

  it("List of users should be returned", async () => {
    const user = await addUser("Test", "test@test.com", true, "password");
    expect(user).not.toBeNull();
    const user2 = await addUser("Test2", "test2@test.com", true, "password");
    expect(user2).not.toBeNull();

    const list = await getAllUsers(10, 0);

    expect(list.length).toBe(2);
  });
});
