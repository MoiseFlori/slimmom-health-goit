import React from "react";
import styles from "./ImagesContainer.module.css";
import banana from "../../assets/banana.png";
import banana2x from "../../assets/banana2x.png";
import leaves from "../../assets/leaves.png";
import leaves2x from "../../assets/leaves2x.png";
import shadow from "../../assets/shadow.png";
import shadow2x from "../../assets/shadow2x.png";
import strawberry from "../../assets/strawberry.png";
import strawberry2x from "../../assets/strawberry2x.png";


const ImagesContainer = () => {
  return (
    <div className={styles.imagesContainer}>
      <picture>
        <source srcSet={`${banana} 1x, ${banana2x} 2x`} />
        <img src={banana} alt="banana" className={styles.banana} />
      </picture>
      <picture>
        <source srcSet={`${leaves} 1x, ${leaves2x} 2x`} />
        <img src={leaves} alt="leaves" className={styles.leaves} />
      </picture>
      <picture>
        <source srcSet={`${shadow} 1x, ${shadow2x} 2x`} />
        <img src={shadow} alt="shadow" className={styles.shadow} />
      </picture>
      <picture>
        <source srcSet={`${strawberry} 1x, ${strawberry2x} 2x`} />
        <img src={strawberry} alt="strawberry" className={styles.strawberry} />
      </picture>
    </div>
  );
};

export default ImagesContainer;
