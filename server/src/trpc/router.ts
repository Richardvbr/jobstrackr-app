import { userRouter } from "@/api/user/router";
import { router } from "./index";

export const appRouter = router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
