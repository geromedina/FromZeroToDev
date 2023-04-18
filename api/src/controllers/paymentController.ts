import { Request, Response } from "express";

interface PaymentController {
  subscriptionService: any;
  title: string;
  description: string;
  price: number;
}

class PaymentController {
  constructor(subscriptionService: any) {
    this.subscriptionService = subscriptionService;
  }
  async getPaymentLink(req: Request, res: Response) {
    try {
      const items = req.body;

      const payment = await this.subscriptionService.createPayment(items);
      return res.json(payment);
    } catch (error: any) {
      return res.status(500).json({ error: true, msg: error.message });
    }
  }
}
export default PaymentController;
