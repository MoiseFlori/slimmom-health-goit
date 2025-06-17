import React from "react";
import styles from "./ImagesContainer.module.css";

// PNG fallback
import banana from "../../assets/banana.png";
import banana2x from "../../assets/banana2x.png";
import leaves from "../../assets/leaves.png";
import leaves2x from "../../assets/leaves2x.png";
import shadow from "../../assets/shadow.png";
import shadow2x from "../../assets/shadow2x.png";
import strawberry from "../../assets/strawberry.png";
import strawberry2x from "../../assets/strawberry2x.png";

// WebP optimizat
import bananaWebp from "../../assets/banana.webp";
import banana2xWebp from "../../assets/banana2x.webp";
import leavesWebp from "../../assets/leaves.webp";
import leaves2xWebp from "../../assets/leaves2x.webp";
import shadowWebp from "../../assets/shadow.webp";
import shadow2xWebp from "../../assets/shadow2x.webp";
import strawberryWebp from "../../assets/strawberry.webp";
import strawberry2xWebp from "../../assets/strawberry2x.webp";

const ImagesContainer = ({ variant = "home" }) => {
  return (
    <div className={`${styles.imagesContainer} ${styles[variant]}`}>
      <picture>
        <source
          type="image/webp"
          srcSet={`${bananaWebp} 1x, ${banana2xWebp} 2x`}
        />
        <source srcSet={`${banana} 1x, ${banana2x} 2x`} />
        <img src={banana} alt="banana" className={styles.banana} />
      </picture>

      <picture>
        <source
          type="image/webp"
          srcSet={`${leavesWebp} 1x, ${leaves2xWebp} 2x`}
        />
        <source srcSet={`${leaves} 1x, ${leaves2x} 2x`} />
        <img src={leaves} alt="leaves" className={styles.leaves} />
      </picture>

      <picture>
        <source
          type="image/webp"
          srcSet={`${shadowWebp} 1x, ${shadow2xWebp} 2x`}
        />
        <source srcSet={`${shadow} 1x, ${shadow2x} 2x`} />
        <img src={shadow} alt="shadow" className={styles.shadow} />
      </picture>

      <picture>
        <source
          type="image/webp"
          srcSet={`${strawberryWebp} 1x, ${strawberry2xWebp} 2x`}
        />
        <source srcSet={`${strawberry} 1x, ${strawberry2x} 2x`} />
        <img src={strawberry} alt="strawberry" className={styles.strawberry} />
      </picture>
    </div>
  );
};

export default ImagesContainer;
