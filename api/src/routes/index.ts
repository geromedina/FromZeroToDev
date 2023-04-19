import { Router } from "express";
import coursesRouter from "./coursesRouter";
import usersRouter from "./userRouter";
import PaymentController from "../controllers/paymentController";
import PaymentService from "../Sevices/PaymentService";
const uploadImage = require("../handlers/imageUploadHandler");

const PaymentInstance = new PaymentController(new PaymentService());

const router = Router();

router.use("/courses", coursesRouter);
router.use("/users", usersRouter);

router.put("/payments", (req, res) => {
  PaymentInstance.getPaymentLink(req, res);
});
router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

router.post("/cloudinary", (req, res) => {
  uploadImage(req.body.image)
    .then((url: any) => res.send(url))
    .catch((err: any) => res.status(500).send(err));
});
export default router;
