import React, { useContext, useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import axios from "../axios";
import { Link, useHistory } from "react-router-dom";
import ShoppingContext from "../Context/ShoppingContext";
import CheckoutProduct from "./CheckoutProduct";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./Payment.css";
import { db } from "../firebase";

const Payment = () => {
  const shoppingContext = useContext(ShoppingContext);
  const { basket, user, getBasketTotal, emptyBasket } = shoppingContext;

  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  // useEffect(() => {
  //   const getClientSecret = async () => {
  //     const response = await axios({
  //       method: "post",
  //       url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
  //     });
  //     setClientSecret(response.data.clientSecret);
  //   };
  //   getClientSecret();
  // }, [basket]);   
  

useEffect(() => {
  const getClientSecret = async () => {
    try {
      const total = Math.round(
        Number(getBasketTotal(basket)) * 100
      );

      if (!Number.isFinite(total) || total <= 0) {
        setClientSecret("");
        return;
      }

      const response = await axios.post(
        `/payments/create?total=${total}`
      );

      console.log("Payment API response:", response.data);
setClientSecret(response.data.clientSecret);

      console.log("Payment response:", response.data);

      const secret =
        response.data.clientSecret ||
        response.data.client_secret;

      if (!secret) {
        throw new Error(
          "Backend did not return a Stripe client secret."
        );
      }

      setClientSecret(secret);
      setError(null);
    } catch (err) {
      console.error("Payment setup failed:", err);
      setClientSecret("");
      setError(
        err.response?.data?.error ||
        err.message ||
        "Unable to prepare payment."
      );
    }
  };

  getClientSecret();
}, [basket, getBasketTotal]);


  console.log("The secret is => ", clientSecret);


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!stripe || !elements || !clientSecret) {
    setError("Payment is not ready. Please try again.");
    return;
  }

  setProcessing(true);
  setError(null);

  try {
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      throw new Error("Card details are missing.");
    }

    const { error: paymentError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

    if (paymentError) {
      setError(paymentError.message);
      return;
    }

    // if (paymentIntent.status === "succeeded") {
    //   await db
    //     .collection("user")
    //     .doc(user.uid)
    //     .collection("orders")
    //     .doc(paymentIntent.id)
    //     .set({
    //       basket: basket,
    //       amount: paymentIntent.amount,
    //       created: paymentIntent.created,
    //     });

    //   setSucceeded(true);
    //   emptyBasket();
//   history.push("/orders");
// } 
if (paymentIntent?.status === "succeeded") {
  setSucceeded(true);
  setError(null);
  emptyBasket();

  await db
    .collection("user")
    .doc(user.uid)
    .collection("orders")
    .doc(paymentIntent.id)
    .set({
      basket,
      amount: paymentIntent.amount,
      created: paymentIntent.created,
    });
}

    else setError("Your payment has not been completed.");
    } catch (err) {
    console.error("Payment failed:", err);
    setError(err.message || "Payment failed. Please try again.");
  } finally {
    setProcessing(false);
  }
};


const handleChange = (e) => {
  setDisabled(e.empty);
  setError(e.error ? e.error.message : "");
};


  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout <Link to="/checkout">{basket?.length} items</Link>
        </h1>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>123 Bleeker Street</p>
            <p>Chicago, New York</p>
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_items">
            {basket.map((item, index) => (
              <CheckoutProduct
                key={`${item.id}-${index}`}
                id={item.id}
                tite={item.tite}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payement_price_container">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                {/* <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button> */}

                
<button
  type="submit"
  disabled={
    processing ||
    disabled ||
    !stripe ||
    !clientSecret ||
    succeeded
  }
>
  {processing
    ? "Processing payment..."
    : succeeded
    ? "Order placed successfully!"
    : "Buy Now"}
</button>


              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;