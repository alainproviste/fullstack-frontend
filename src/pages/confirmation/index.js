import React, {useEffect, useContext} from 'react';
import { useRouter } from "next/router";
import CartContext from "../../context/CartContext";
import Titlepage from '../../components/UI/Title/TitlePage';
const Index = () => {
    const { deleteCart } = useContext(CartContext);

    const router = useRouter();

    useEffect(() => {
        deleteCart();
    });
    
    return (
      
        <div>
            <Titlepage title="Merci pour votre commande" />
            <div className="text-center">
                <p>Votre commande d'un montant de {router.query.amount} € a bien été validée</p>
            </div>
        </div>
    );

}

export default Index;