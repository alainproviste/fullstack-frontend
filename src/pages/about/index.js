import React, { useState } from "react";
import Titlepage from "../../components/UI/Title/TitlePage";
import Modal from "../../components/UI/Modal/Modal";
import styles from "./index.module.scss";
const Index = () => {
  const [displayModal, setDisplayModal] = useState(false);

  const closeModal = () => {
    setDisplayModal(!displayModal);
  };
  const validateModal = () => {
    console.log("it's validated");
  };

  //EXEMPLE stringify/parse
  const myArray = [{ title: "product1" }, { title: "product2" }, { title: "product3"}];
  
  console.log(myArray);

  const stringifyArray = JSON.stringify(myArray);

  console.log(stringifyArray);

  const parsedArray = JSON.parse(stringifyArray);

  console.log(parsedArray);

  parsedArray.forEach(element => {
    console.log(element);
  });

  localStorage.setItem('test', parsedArray);

  return (
    <div className={styles.page__about}>
      <Titlepage title="About page" />
      <div className="text-center">
      <button className="btn btn-black" onClick={()=>setDisplayModal(!displayModal)}> display modal</button>
      </div>
      {displayModal ? (
        <Modal
          title="mon titre"
          cancelFunction={closeModal}
          validateFunction={validateModal}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
            dolore nisi, totam aut dignissimos laudantium vel, quam tenetur
            optio molestiae provident ullam pariatur doloribus minus ipsam et
            dolor rerum dolorem!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
            nihil aspernatur unde a quos minus iure cum consequatur dolorum
            dolore odit totam et quod, illo necessitatibus labore! A, officia
            fugit.
          </p>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

export default Index;