import { Router } from "express";
import coursesRouter from "./coursesRouter";
import usersRouter from "./userRouter";

const router = Router();

router.use("/courses", coursesRouter);
router.use("/users", usersRouter);

export default router;
