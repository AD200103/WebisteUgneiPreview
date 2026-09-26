import Virselis from "../Components/Virselis/Virselis";
import Apie from "../Components/Apie/Apie";
import Servisas from "../Components/Servisas/Servisas";
import Nuotraukos from "../Components/Nuotraukos/Nuotraukos";
import Kontaktai from "../Components/Kontaktai/Kontaktai";
import ScrollToTopBtn from "../Components/ScrollToTopBtn/ScrollToTopBtn";
import Remontas from "@/Components/Remontas/Remontas";
import Slaptazodis from "@/Components/Slaptazodis/Slaptazodis";
import LiquidReveal from "@/Components/DiskoBall/DiskoBall";
import { useState, useEffect } from "react";
const Main = () => {
  //<Slaptazodis setVisible={setVisible} />
  //<Remontas />
  const [notVisible, setVisible] = useState(true);
  const [pass, setPass] = useState("");
  useEffect(() => {
    const passVal = localStorage.getItem("pass") ?? "";
    setPass(passVal);
    if (pass) {
      setVisible(false);
    }
  });

  return notVisible ? (
    <Slaptazodis setVisible={setVisible} />
  ) : (
    <>
      <LiquidReveal
        topImage="\celebratoryBackTo2.gif"
        bottomImage="\celebratoryBack.png"
      />
      <Virselis />
      <Apie />
      <Servisas />
      <Nuotraukos />
      <Kontaktai />
      <ScrollToTopBtn />
    </>
  );
};
export default Main;
