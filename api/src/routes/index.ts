import { Router } from "express";
import coursesRouter from "./coursesRouter";
import usersRouter from "./userRouter";
import PaymentController from "../controllers/paymentController";
import PaymentService from "../Sevices/PaymentService";

const PaymentInstance = new PaymentController(new PaymentService());

const router = Router();

router.use("/courses", coursesRouter);
router.use("/users", usersRouter);

router.put("/payments", (req, res) => {
  PaymentInstance.getPaymentLink(req, res);
});
router.post("/purchases", (req, res) => {});

export default router;
