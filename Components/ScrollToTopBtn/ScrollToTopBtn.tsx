import { useEffect, useState } from "react";
import styles from "./styles.module.css";
const ScrollToTopBtn = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    visible && (
      <button className={styles.scrollTopBtn} onClick={scrollToTop}>
        <img src={"/buttonPics/scrollUpImg.svg"} />
      </button>
    )
  );
};
export default ScrollToTopBtn;
