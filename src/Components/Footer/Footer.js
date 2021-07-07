import React from "react";
import "./footer.css";

function Footer() {
  return (
    <div className="footer_container">
      <p>
        {" "}
        Copyright &copy; 2021-
        <script>document.write(new Date().getFullYear())</script>
        Your Name All Rights Reserved
      </p>
    </div>
  );
}

export default Footer;
