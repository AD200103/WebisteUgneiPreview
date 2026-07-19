import styles from "./styles.module.css";
const Servisas = () => {
  return (
    <div className={styles.main}>
      <div className={styles.sectPicAndDescBox}>
        <img className={styles.ball} src="/pics/foto (16).webp" />
        <div className={styles.titleAndGrid}>
          <h1>PASLAUGOS</h1>
          <div className={styles.contentBox}>
            <div className={styles.serviceBox}>
              <img
                className={styles.serviceIcon}
                src="/servicePics/event.svg"
              />
              <h3>Renginio koncepcija</h3>
            </div>
            <div className={styles.serviceBox}>
              <img
                className={styles.serviceIcon}
                src="/servicePics/finance.svg"
              />
              <h3>Planavimas ir <br/>biudžetas</h3>
            </div>
            <div className={styles.serviceBox}>
              <img
                className={styles.serviceIcon}
                src="/servicePics/search.svg"
              />
              <h3>Tiekėjų paieška ir koordinavimas</h3>
            </div>
            <div className={styles.serviceBox}>
              <img
                className={styles.serviceIcon}
                src="/servicePics/director.svg"
              />
              <h3>Renginio režisūra</h3>
            </div>
            <div className={styles.serviceBox}>
              <img
                className={styles.serviceIcon}
                src="/servicePics/directions.svg"
              />
              <h3>Renginio  <br/>koordinavimas</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Servisas;
