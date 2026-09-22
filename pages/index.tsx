import Virselis from "../Components/Virselis/Virselis";
import Apie from "../Components/Apie/Apie";
import Servisas from "../Components/Servisas/Servisas";
import Nuotraukos from "../Components/Nuotraukos/Nuotraukos";
import Kontaktai from "../Components/Kontaktai/Kontaktai";
import ScrollToTopBtn from "../Components/ScrollToTopBtn/ScrollToTopBtn";
import Remontas from "../Components/Remontas/Remontas";
import Slaptazodis from "../Components/Slaptazodis/Slaptazodis";
import { useState } from "react";
const Main = () => {
  const trueThing = true;
  const [visible, setVisible] = useState(false);

  return trueThing ? (
    <Slaptazodis visible={visible} setVisible={setVisible} />
  ) : (
    <>
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
