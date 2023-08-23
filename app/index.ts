import { Router } from "express";

// routes
import userRouter from "./users/users.route";
import adminRouter from "./admin/admin.route";
import categoryRouter from "./categories/categories.route";
import postRouter from "./posts/posts.route";

const appRouter = Router();

appRouter.get("/", (req, res) => {
  res.send("Hello World.");
});

appRouter.use("/api/admin", adminRouter);
appRouter.use("/api/user", userRouter);
appRouter.use("/api/category", categoryRouter);
appRouter.use("/api/post", postRouter);

export default appRouter;
