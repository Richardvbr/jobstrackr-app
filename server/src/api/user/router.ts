import { z } from "zod";

import { router, publicProcedure } from "@/trpc";

import { users } from "./db";
import { User } from "./types";

export const userRouter = router({
  getUsers: publicProcedure.query(() => {
    return users;
  }),
  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query((req) => {
      const { input } = req;

      const user = users.find((user) => user.id === input.id);

      return user;
    }),
  createUser: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation((req) => {
      const { input } = req;

      const user: User = {
        id: `${Math.random()}`,
        name: input.name,
      };

      users.push(user);

      return user;
    }),
});
