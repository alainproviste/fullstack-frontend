import { createContext, useState, useEffect } from "react";

let cart = typeof window !== "undefined" ? localStorage.getItem("cart") : [];

const CartContext = createContext({
  cart: [],
  removeItem: () => {},
  addItem: () => {},
  deleteLine: () => {},
  deleteCart: () => {},
  clearCart: () => {},
  count: 0,
  total: 0,
});

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart"))
      : []
  );

  const [count, setCount] = useState(
    cart ? cart.reduce((total, product) => total + product.qty, 0) : 0
  );

  const [total, setTotal] = useState(
    cart
      ? cart.reduce((total, product) => total + product.qty * product.price, 0)
      : 0
  );

  const deleteLine = (id) => {
    const cartFiltered = cart.filter((item) => item.id !== id);
    setCart(cartFiltered);
    localStorage.setItem("cart", JSON.stringify(cartFiltered));
    console.log(cartFiltered);
  };

  const deleteCart = () => {
    localStorage.removeItem("cart");
    setCart(null);
  };

  const addItem = (item) => {
    //On créé un nouvel objet à insérer dans le panier avec la propriété qty
    let productObject = {
      id: item.id,
      title: item.title,
      price: item.price,
      qty: 1,
    };
    //Si le panier est vide, on insère le nouvel object
    if (!cart) {
      setCart([productObject]);
      // setCount(1);
    }
    //Si le panier est déjà remplit
    else {
      // On va chercher si le produit à ajouter dans le panier existe
      // La méthode findIndex, renvoie si la condition est réalisée, la position de l'object dans le tableau
      // Si la condition n'est pas réalisée, renvoie -1
      let indexOfExistingProduct = cart.findIndex(
        (el) => el.id === productObject.id
      );
      //ON est dans le cas condition vérifiée, le indexOfexsitingProduct renvoie une position de l'object trouvé
      if (indexOfExistingProduct !== -1) {
        //On va incrémenter le produit d'une quantité
        cart[indexOfExistingProduct].qty += 1;
      } else {
        //Le porduit n'est pas dans le panier, on le set en gardant les éléments existants (avec le spread operator)
        setCart([...cart, productObject]);
      }
    }
    //On met à jour le localstorage
    localStorage.setItem("cart", JSON.stringify(cart));
    setCount(
      cart ? cart.reduce((total, product) => total + product.qty, 0) : 0
    );
    setTotal(
      cart
        ? cart.reduce(
            (total, product) => total + product.qty * product.price,
            0
          )
        : 0
    );
  };
  const removeItem = (item) => {
    if (item.qty > 1) {
      let indexOfExistingProduct = cart.findIndex((el) => el.id === item.id);
      if (indexOfExistingProduct !== -1) {
        cart[indexOfExistingProduct].qty--;
      } else {
        setCart([...cart, item]);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      setCount(
        cart ? cart.reduce((total, product) => total + product.qty, 0) : 0
      );
      setTotal(
        cart
          ? cart.reduce(
              (total, product) => total + product.qty * product.price,
              0
            )
          : 0
      );
    }
  };

  const context = {
    cart,
    count,
    addItem,
    removeItem,
    total,
    deleteLine,
    deleteCart,
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setCount(
      cart ? cart.reduce((total, product) => total + product.qty, 0) : 0
    );
    setTotal(
      cart
        ? cart.reduce(
            (total, product) => total + product.qty * product.price,
            0
          )
        : 0
    );
    return () => {
      localStorage.setItem("cart", JSON.stringify(cart));
    };
  }, [cart, count, total]);

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
};

export default CartContext;