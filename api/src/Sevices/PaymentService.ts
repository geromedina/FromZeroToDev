import axios from "axios";


interface PaymentService {
  title: string;
  description: string;
  price: number;
}
class PaymentService {
  async createPayment(items: any) {
    console.log(items);
    const url = "https://api.mercadopago.com/checkout/preferences";
    const body = {
      items: [
        {
          id: "product.id",
          title: `${items.title}`,
          currency_id: "ARS",
          picture_url:
            "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
          description: "NIY",
          category_id: `Programming languaje`,
          quantity: 1,
          unit_price: items.unit_price,
        },
      ],
      payer: {
        name: "Matias",
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
        success: "https://from-zero-to-dev-posta.vercel.app/",
        failure: "http://www.failure.com",
        pending: "http://www.pending.com",
      },
      auto_return: "approved",
      notification_url: "https://minegocio.com",
      statement_descriptor: "MINEGOCIO",
      external_reference: `${items.title}`,
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
