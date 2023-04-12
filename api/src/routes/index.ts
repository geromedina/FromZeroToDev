import { Router } from "express";
import coursesRouter from "./coursesRouter";
import usersRouter from "./userRouter";
import PaymentController from "../controllers/paymentController";
import PaymentService from "../Sevices/PaymentService";
import emailRouter from "./emailSendRouter";

const PaymentInstance = new PaymentController(new PaymentService());

const router = Router();

router.use("/courses", coursesRouter);
router.use("/users", usersRouter);
router.use("/email", emailRouter )

router.get("/payments", (req, res) => {
  PaymentInstance.getPaymentLink(req, res);
});

export default router;
