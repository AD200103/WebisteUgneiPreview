import styles from "./styles.module.css";
const Apie = () => {
  return (
    <div className={styles.main}>
      <div className={styles.labasBox}>
        <img src="/pics/foto (14).webp" />
        <div className={styles.textBox}>
          <h1>Labas!</h1>
          <p>
            Kiekvienas renginys turi savo istoriją. Vieni skirti įkvėpti, kiti -
            suburti, o treti - tiesiog švęsti gyvenimą. Tikrai įsimintinas
            renginys prasideda nuo pokalbio, aiškios idėjos ir dėmesio detalėms.
            Per daugiau nei 5 metus organizuojant įvairaus masto renginius (
            <strong>nuo 20 iki 1500 dalyvių</strong>) sukaupta patirtis šiandien
            padeda kurti tiek įmonių renginius, tiek privačias šventes.
            Nesvarbu, ar tai komandos vasaros šventė, konferencija ar
            gimtadienis - tikslas visada tas pats: sukurti atmosferą, kurioje
            gera būti ir kurią norisi prisiminti. O gal net pakartoti!
          </p>
        </div>
      </div>
      <div className={styles.idejaAtmosferaBox}>
        <div className={styles.textBox}>
          <h1>Nuo idėjos iki atmosferos</h1>
          <p>
            Kiekvienas renginys susideda iš šimtų sprendimų, kurių svečiai
            dažniausiai net nepastebi. Būtent jie ir lemia, ar viskas vyks
            sklandžiai. Nuo koncepcijos ir tiekėjų iki režisūros bei
            koordinavimo: pasirūpinama visu procesu, kad Jūs galėtumėte mėgautis
            kiekviena akimirka!
          </p>
        </div>
        <img src="/pics/foto (7).webp" />
      </div>
    </div>
  );
};
export default Apie;
