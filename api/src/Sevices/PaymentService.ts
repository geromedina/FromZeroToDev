import axios from "axios";
interface PaymentService {
  title: string;
  description: string;
  price: number;
}
class PaymentService {
  //   constructor(title: string, description: string, price: number) {
  //     this.price = price;
  //     this.description = description;
  //     this.title = title;
  //   }
  async createPayment(title: string, description: string, price: string) {
    console.log(title, description, price);
    const url = "https://api.mercadopago.com/checkout/preferences";
    const body = {
      items: [
        {
          id: "item-ID-1234",
          title: `${title}`,
          currency_id: "ARS",
          picture_url:
            "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
          description: `${description}`,
          category_id: "art",
          quantity: 1,
          unit_price: parseInt(price),
        },
      ],
      payer: {
        name: "Juan",
        surname: "Lopez",
        email: "user@email.com",
        phone: {
          area_code: "11",
          number: "4444-4444",
        },
        identification: {
          type: "DNI",
          number: "01111111",
        },
        address: {
          street_name: "Street",
          street_number: 123,
          zip_code: "5700",
        },
      },
      back_urls: {
        success: "https://www.success.com",
        failure: "http://www.failure.com",
        pending: "http://www.pending.com",
      },
      auto_return: "approved",
      notification_url: "https://www.your-site.com/ipn",
      statement_descriptor: "MINEGOCIO",
      external_reference: "Reference_1234",
      expires: true,
    };
    console.log(body);
    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });
    return payment.data;
  }
}
export default PaymentService;
