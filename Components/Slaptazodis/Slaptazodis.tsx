import styles from "./styles.module.css";
import { useState } from "react";
import React from "react";
const Slaptazodis = ({
  setVisible,
}: React.Dispatch<React.SetStateAction<boolean>>) => {
  const [input, setInput] = useState("");
  const password = "ugnelici";
  const changeInputValue = (event) => {
    setInput(event.target.value);
  };
  const setVisibleContent = () => {
    if (input === password) {
      setVisible(false);
    } else {
      return;
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.form}>
        <input
          type="password"
          value={input}
          onChange={changeInputValue}
          placeholder="Enter password"
        />
        <button onClick={setVisibleContent} type="submit">
          Enter
        </button>
      </div>
    </div>
  );
};
export default Slaptazodis;
