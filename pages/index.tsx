import Virselis from "../Components/Virselis/Virselis";
import Apie from "../Components/Apie/Apie";
import Servisas from "../Components/Servisas/Servisas";
import Nuotraukos from "../Components/Nuotraukos/Nuotraukos";
import Kontaktai from "../Components/Kontaktai/Kontaktai";
import ScrollToTopBtn from "../Components/ScrollToTopBtn/ScrollToTopBtn";
import Slaptazodis from "../Components/Slaptazodis/Slaptazodis";
import { useState } from "react";
const Main = () => {
  const [notvisible, setVisible] = useState(true);

  return notvisible ? (
    <Slaptazodis setVisible={setVisible} />
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
