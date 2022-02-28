import React from 'react';
import styles from "./Modal.module.scss";

const Modal = (props) => {
    return (
        <>
        <div className={styles.overlay}></div>
        <div className={styles.modal}>
            <h2>{props.title}</h2>
            {props.children}
            <div className={styles.btn__group}>
                <button className="btn btn-white" onClick={props.cancelFunction}>Annuler</button>
                <button className="btn btn-black" onClick={props.validateFunction}>Valider</button>
            </div>
        </div>
        </>
    );
}

export default Modal;