import { Elysia, t } from "elysia";
import { usersService } from "../service/users-service";

export const usersRoutes = new Elysia({ prefix: "/api/users" })
  .post(
    "/",
    async ({ body, set }) => {
      try {
        await usersService.registerUser(body);
        return { data: "ok" };
      } catch (error: any) {
        if (error.message === "email sudah terdaftar") {
          set.status = 400;
          return { error: error.message };
        }
        set.status = 500;
        return { error: "Terjadi kesalahan pada server" };
      }
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String({ format: "email" }),
        password: t.String(),
      }),
    }
  );
