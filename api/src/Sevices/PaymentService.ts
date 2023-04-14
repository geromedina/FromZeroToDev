import axios from "axios";
interface PaymentService {
  title: string;
  description: string;
  price: number;
}
class PaymentService {
  // https://www.success.com/?collection_id=56881684554&collection_status=approved&payment_id=56881684554&status=approved&external_reference=Reference_1234&payment_type=account_money&merchant_order_id=8698537933&preference_id=1345606588-14772c45-2016-4483-b448-5539f21b9f92&site_id=MLA&processing_mode=aggregator&merchant_account_id=null
  async createPayment(items: []) {
    console.log(items);
    const url = "https://api.mercadopago.com/checkout/preferences";
    const body = {
      items: items,
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
        success: "http://localhost:3000/courses",
        failure: "http://www.failure.com",
        pending: "http://www.pending.com",
      },
      auto_return: "approved",
      notification_url: "https://www.your-site.com/ipn",
      statement_descriptor: "MINEGOCIO",
      external_reference: "123456",
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
