import { router } from ".";
import { userRouter } from "../api/user/router";

export const appRouter = router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
