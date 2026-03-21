import { Elysia } from "elysia";
import { db } from "./db";
import { usersRoutes } from "./routes/users-routes";

const app = new Elysia()
  .decorate("db", db)
  .use(usersRoutes)
  .get("/", () => "Hello Elysia")
  .get("/users", async ({ db }) => {
    return await db.query.users.findMany();
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
