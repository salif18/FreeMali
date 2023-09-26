import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import { useContext } from "react";
import { MyStore } from "../context/myStore";

const NavbarSearch = () => {
  const navigate = useNavigate()
  const { valueSearch, handleChange } = useContext(MyStore);
  return (
    <nav className="navbarSearch" >
      <div className="navbarSearch-left" onClick={()=>navigate('/')}>
        <h1 className="navh2">FreeMali</h1>
      </div>
      <div className="navbarSearch-rigth">
        <input
          className="input-search2"
          value={valueSearch}
          onChange={handleChange}
          placeholder="Rechercher des prestataires..."
        />
        <button className="btn-navSearch">
          <SearchSharpIcon
            style={{ color: "#555555", fontWeight: "bold", fontSize: 30 }}
          />
        </button>

      </div>
    </nav>
  );
};

export default NavbarSearch;
