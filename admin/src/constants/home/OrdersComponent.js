import React, { useContext } from "react";
import CasesRoundedIcon from "@mui/icons-material/CasesRounded";
import { MyStore } from "../../context/myStore";

const OrdersComponent = () => {
  const { offres } = useContext(MyStore);
  return (
    <div className="ordersComponent">
      <div className="orders-icon">
        <CasesRoundedIcon
          style={{ color: "green", padding: 10, fontSize: 40 }}
        />
      </div>
      <div className="orders-infos">
        <h3>Offres</h3>
        <p>{offres.length}</p>
      </div>
    </div>
  );
};

export default OrdersComponent;
