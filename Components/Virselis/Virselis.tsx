import styles from "./styles.module.css";
import { useState, useEffect } from "react";
const Virselis = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <div className={`${styles.main} ${show && styles.mainShow} `}>
      <img className={styles.virselis} src="/pics/virselis.webp" />
      <img className={styles.logo} src="/pics/logo.png" />
      <ul className={styles.menuList}>
        <li>KONCEPTO KŪRIMAS</li>
        <li className={styles.menuDot}></li>
        <li>RENGINIŲ REŽISŪRA</li>
        <li className={styles.menuDot}></li>
        <li>RENGINIŲ KOORDINAVIMAS</li>
        <li className={styles.menuDot}></li>
        <li>PATIKIMI PARTNERIAI</li>
      </ul>
    </div>
  );
};
export default Virselis;
