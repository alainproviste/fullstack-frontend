import React, {useContext} from "react";
import Image from "next/image";

import { toast, ToastContainer } from "react-nextjs-toast";

import { useRouter } from "next/router";

import { getProduct } from "../../../graphql/queries/products";
import { useQuery } from "@apollo/react-hooks";

import CartContext from "../../../context/CartContext";

import styles from "./index.module.scss";

const Index = () => {
    const router = useRouter();
    const { addItem } = useContext(CartContext);


  const { loading, error, data } = useQuery(getProduct, {
    variables: {
      id: router.query.id,
    },
  });

  if (loading) {
    return "loading...";
  }

  if (error) {
    console.log(error);
    return null;
  }

  console.log(data.title);

  return (
    <div className={styles.product__container}>
      <ToastContainer align={"right"} position={"top"} />
      <div className={styles.product__img}>
        <Image
          src={data.getProduct.img}
          alt={data.getProduct.title}
          width="400"
          height="400"
          layout="intrinsic"
        />
      </div>
      <div className={styles.product__content}>
        <h1>{data.getProduct.title}</h1>
        <p className={styles.price}>{data.getProduct.price}</p>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
          exercitationem, enim magnam accusamus, repellat, laudantium quo
          impedit veniam possimus odit rerum aspernatur omnis non hic fuga quae?
          Eos, illo veniam!
        </p>
        <button
          className="btn btn-black"
          onClick={() => {
            toast.notify(`Votre produit est bien ajouté au panier`, {
              duration: 5,
              type: "success",
            });
            addItem(data.getProduct);
          }}
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default Index;