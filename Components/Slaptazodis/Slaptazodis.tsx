import styles from "./styles.module.css";
import { useState } from "react";
const Slaptazodis = ({ visible, setVisible }) => {
  const [inputVal, setInputVal] = useState("");
  return (
    <div className={styles.main}>
      <div className={styles.form}>
        <input
          value={inputVal}
          onChange={setInputVal(inputVal)}
          placeHolder="Enter password"
        />
        <button type="submit">Enter</button>
      </div>
    </div>
  );
};
export default Slaptazodis;
