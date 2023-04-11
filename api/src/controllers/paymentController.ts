import { Request, Response } from "express";

interface PaymentController {
  subscriptionService: any;
  title: string;
  description: string;
  price: number;
}

class PaymentController {
  constructor(
    subscriptionService: any
    //   title: string,
    //   description: string,
    //   price: number
  ) {
    this.subscriptionService = subscriptionService;
    //   this.title = title;
    //   this.description = description;
    //   this.price = price;
  }
  async getPaymentLink(req: Request, res: Response) {
    try {
      const { title, description, price } = req.query;
      console.log(req.params);
      const payment = await this.subscriptionService.createPayment(
        title,
        description,
        price
      );
      return res.json(payment);
    } catch (error: any) {
      return res.status(500).json({ error: true, msg: error.message });
    }
  }
}
export default PaymentController;
