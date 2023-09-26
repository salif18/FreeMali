import React, { useContext } from "react";
import StoreIcon from "@mui/icons-material/Store";
import { MyStore } from "../../context/myStore";

const NombreProductComponent = () => {
  const { users } = useContext(MyStore);
  const prestas = users.filter((pres) => pres.isPrestataire)
  return (
    <div className="nombreProductComponent">
      <div className="nombre-icons">
        <StoreIcon />
      </div>
      <div className="nombre-infos">
        <h3>Prestataires</h3>
        <p>{prestas.length}</p>
      </div>
    </div>
  );
};

export default NombreProductComponent;
