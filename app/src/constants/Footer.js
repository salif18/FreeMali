import React from "react";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-footer">
        <div className="contacts">
          <h2>Contacts</h2>
          <a>
            <FacebookSharpIcon
              style={{ color: "#aaa", fontSize: 30, fontWeight: "bold" }}
            />{" "}
            Facebook
          </a>
          <a>
            <WhatsAppIcon
              style={{ color: "#aaa", fontSize: 30, fontWeight: "bold" }}
            />{" "}
            WhatsApp
          </a>
          <a>
            <TwitterIcon
              style={{ color: "#aaa", fontSize: 30, fontWeight: "bold" }}
            />{" "}
            Twitter
          </a>
          <a>
            <InstagramIcon
              style={{ color: "#aaa", fontSize: 30, fontWeight: "bold" }}
            />{" "}
            Instagram
          </a>
        </div>
        <div className="service">
          <h2>Nos services</h2>
          <a>
            <FacebookSharpIcon
              style={{ color: "#aaa", fontSize: 30, fontWeight: "bold" }}
            />{" "}
            Facebook
          </a>
          <a>
            <WhatsAppIcon
              style={{ color: "#aaa", fontSize: 30, fontWeight: "bold" }}
            />{" "}
            WhatsApp
          </a>
          <a>
            <TwitterIcon
              style={{ color: "#aaa", fontSize: 30, fontWeight: "bold" }}
            />{" "}
            Twitter
          </a>
          <a>
            <InstagramIcon
              style={{ color: "#aaa", fontSize: 30, fontWeight: "bold" }}
            />{" "}
            Instagram
          </a>
        </div>
        <div className="politique">
          <h2>Nos politiques</h2>
          <a>
            <FacebookSharpIcon
              style={{ color: "#aaa", fontSize: 30, fontWeight: "bold" }}
            />{" "}
            Facebook
          </a>
          <a>
            <WhatsAppIcon
              style={{ color: "#aaa", fontSize: 30, fontWeight: "bold" }}
            />{" "}
            WhatsApp
          </a>
          <a>
            <TwitterIcon
              style={{ color: "#aaa", fontSize: 30, fontWeight: "bold" }}
            />{" "}
            Twitter
          </a>
          <a>
            <InstagramIcon
              style={{ color: "#aaa", fontSize: 30, fontWeight: "bold" }}
            />{" "}
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
