import styles from "./styles.module.css";
import { useState } from "react";
const Kontaktai = () => {
  const [visible, setVisible] = useState(false);
  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 1000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={styles.main}>
      <h1>Kurkime renginių atmosferą kartu!</h1>
      <div className={styles.contactBox}>
        <div
          onClick={() => {
            copyText("renginiai@atmosferai.lt");
          }}
          className={styles.secBox}
        >
          <img src={"contactsPics/mail.svg"} />
          <p>renginiai@atmosferai.lt</p>
          <img className={styles.copyIm} src={"contactsPics/copy.svg"} />
        </div>
        <div
          onClick={() => {
            copyText("+37060802009");
          }}
          className={styles.secBox}
        >
          <img src={"contactsPics/phone.svg"} />
          <p>+37060802009</p>
          <img className={styles.copyIm} src={"contactsPics/copy.svg"} />
        </div>
        <a
          href={
            "https://www.instagram.com/atmosfera_renginiai?igsh=MWhjazIxNnJyczZwdA=="
          }
        >
          <div className={styles.secBox}>
            <img src={"contactsPics/instagram.svg"} />
            <p>INSTAGRAM</p>
          </div>
        </a>
      </div>
      <div className={`${styles.coppiedBox} ${visible && styles.ative}`}>
        <img
          className={styles.checkCircle}
          src={"/contactsPics/checkMark.svg"}
        />
        Nukopijuota!
      </div>
    </div>
  );
};
export default Kontaktai;
