import styles from "./styles.module.css";
import { useState } from "react";
type Props = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Slaptazodis = ({ setVisible }: Props) => {
  const [input, setInput] = useState("");
  const pass = "ugnelici";
  const [placeHolder, setPlaceHolder] = useState("Slaptažodis");
  const [inputType, setInputType] = useState("password");
  const [passVis, setPasVis] = useState(false);

  const veryfyPass = () => {
    if (pass === input) {
      setVisible(false);
      localStorage.setItem("pass", input);
    } else {
      setInput("");
      setPlaceHolder("Neteisingas slaptažodis!");
      setTimeout(() => {
        setPlaceHolder("Slaptažodis");
      }, 2000);
      return;
    }
  };

  const changeInputType = () => {
    if (inputType === "password") {
      setInputType("text");
      setPasVis(true);
    } else {
      setInputType("password");
      setPasVis(false);
    }
  };

  const formSubmission = (event) => {
    event.preventDefault();
    veryfyPass();
  };
  const changeInputVal = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className={styles.main}>
      <div className={styles.formContent}>
        <h1>Iveskite slaptažodį</h1>
        <form className={styles.formContainer} onSubmit={formSubmission}>
          <input
            className={styles.password}
            placeholder={placeHolder}
            value={input}
            onChange={changeInputVal}
            type={inputType}
          />
          <input
            type="checkbox"
            onClick={changeInputType}
            className={`${passVis ? styles.pasVis : styles.pasInvis} `}
          />
          <button type="submit">Eiti</button>
        </form>
      </div>
    </div>
  );
};
export default Slaptazodis;
