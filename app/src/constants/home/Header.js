import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MyStore } from "../../context/myStore";

const Header = () => {
  const { isInLine } = useContext(MyStore);
  return (
    <header className="header">
      <div className="header-left">
        <div className="container-header-title">
          <h2 className="header-title">FreeMali</h2>
        </div>
        <a href="https://www.google.com/maps/d/edit?mid=16CrjtsUTS-ZQI8nioIGzalRqLgvliI4&usp=sharing">
          <img
            className="img-so"
            src="https://play-lh.googleusercontent.com/Kf8WTct65hFJxBUDm5E-EpYsiDoLQiGGbnuyP6HBNax43YShXti9THPon1YKB6zPYpA"
            alt=""
          />
        </a>
      </div>
      <div className="header-rigth">
        {!isInLine && <NavLink to="/connecter">Se connecter</NavLink>}
      </div>
    </header>
  );
};

export default Header;
