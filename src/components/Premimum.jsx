import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Premium = () => {
  const handleBuyClick = async (membershipType) => {
    const { data: order } = await axios.post(BASE_URL + "/payment/create", { membershipType }, { withCredentials: true });
    var options = {
      "key": order.keyId,               // Enter the Key ID generated from the Dashboard
      "amount": order.amount,                  // Amount in currency subunits (e.g., 50000 paise = ₹500)
      "currency": order.currency,
      "name": "Dev Tinder",
      "description": "Connect to developers",
      "order_id": order.orderId, // Pass the order_id generated from your backend server
      callback_url: "http://localhost:3000/payment-success",
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      theme: {
        color: "#f37254"
      },
      "modal": {
        "ondismiss": function () {
          console.log('Checkout modal closed by user without completing payment.');
        }
      }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  }
  return (
    <div className="flex w-full mt-[80px]">
      <div className="card bg-base-300 rounded-box grid h-full grow place-items-center p-8">
        <h1 className="font-bold text-3xl">Silver Membership</h1>
        <ul>
          <li> - Chat with other people</li>
          <li> - 100 connection requests per day</li>
          <li> - Blue Tick</li>
          <li> - 3 months</li>
        </ul>
        <button className="btn btn-secondary" onClick={() => handleBuyClick('silver')}>Buy Silver</button>
      </div>
      <div className="divider divider-horizontal">OR</div>
      <div className="card bg-base-300 rounded-box grid h-full grow place-items-center p-8">
        <h1 className="font-bold text-3xl">Gold Membership</h1>
        <ul>
          <li> - Chat with other people</li>
          <li> - Infinite connection requests per day</li>
          <li> - Blue Tick</li>
          <li> - 6 months</li>
        </ul>
        <button className="btn btn-primary" onClick={() => handleBuyClick('gold')}>Buy Gold</button>
      </div>
    </div >
  )
}

export default Premium;