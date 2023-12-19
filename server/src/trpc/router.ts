import { applicationRouter } from "../api/application";
import { userRouter } from "../api/user";
import { router } from "./index";

export const appRouter = router({
  user: userRouter,
  application: applicationRouter,
});

export type AppRouter = typeof appRouter;
