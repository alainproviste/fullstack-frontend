import React, { useContext, useEffect } from "react";
import TitlePage from "../../components/UI/Title/TitlePage";
import { loadStripe } from "@stripe/stripe-js";
import stripeService from "../../services/stripe.service";
import CartContext from "../../context/CartContext";
import Message from "../../components/UI/Message/Message";
import styles from "./index.module.scss";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

const Index = () => {

  const { cart, addItem, removeItem, total, count, deleteLine, deleteCart} = useContext(CartContext);

  const handleConfirmation = async (body) => {
    const token = localStorage.getItem('token');
    const payload = {
      total: total,
      count: count,
      cart: cart
    }
    try {
      const stripe = await stripePromise;
      const response = await stripeService.createSession(token, payload);
      await stripe.redirectToCheckout({
        sessionId: response.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <TitlePage title="Panier" />
      <div className={styles.cart__content}>
        {cart ? (
          <>
          <table>
            <thead>
              <tr>
                <td>Produit</td>
                <td>Quantités</td>
                <td>Price</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {
              cart.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.qty}</td>
                <td>{product.qty * product.price}</td>
                <td>
                  <button onClick={() => addItem(product)} className="btn">
                    +
                  </button>
                </td>
                <td>
                    <button className="btn" onClick={()=> {removeItem(product)}}>
                      -
                    </button>
                </td>
                <td>
                  <button className="btn btn-white" onClick={()=>{deleteLine(product.id)}}>Supprimer</button>
                </td>
              </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th id="total" colSpan="5">
                  Total :
                </th>
                <td>{total} €</td>
              </tr>
            </tfoot>
            </table>
            <br/>
          <button className="btn btn-white" onClick={()=>{deleteCart()}}>Vider le panier</button>
          </>
        ) : (
          ""
        )}
        {!cart ? <Message type="info" message="No item in cart" /> : ""}
        <div className={styles.btn__group}>
          <button className="btn btn-black" onClick={handleConfirmation}>
            Payer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;