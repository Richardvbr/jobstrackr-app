import { userRouter } from "../api/user";
import { router } from "./index";

export const appRouter = router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
