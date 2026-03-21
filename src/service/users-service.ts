import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export class UsersService {
  async registerUser(data: typeof users.$inferInsert) {
    // 1. Check if email already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, data.email),
    });

    if (existingUser) {
      throw new Error("email sudah terdaftar");
    }

    // 2. Hash password
    // Bun.password.hash uses bcrypt by default
    const hashedPassword = await Bun.password.hash(data.password, {
      algorithm: "bcrypt",
      cost: 10,
    });

    // 3. Save to database
    await db.insert(users).values({
      ...data,
      password: hashedPassword,
    });

    return { success: true };
  }
}

export const usersService = new UsersService();
