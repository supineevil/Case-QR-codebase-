import React, { useState } from "react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import "./Hash.css";

export default function Hashgenerator() {
  const [text,setText]=useState("Welcome to my website")
  const handlegenerate=()=>{
    let qrtext=document.getElementById('qr-text')
    setText(qrtext.value)
  }
  return (
    <div>
      <button className="btn btn-info my-4">
        <Link className="navbar-brand  " to="/">
        CASE EDITOR
        </Link>
      </button>
      &nbsp;&nbsp;
      <button className="btn btn-info my-4">
        <Link className="navbar-brand  " to="/RichEditor">
          RICH EDITOR
        </Link>
      </button>
      &nbsp;&nbsp;
    <button className="btn btn-info my-4"><Link className="navbar-brand  " to="/Voicetotext">Voice-to-text</Link></button>  
      <br />
      <br />
      <div className="hashbox">
        <p>YOUR PERSONAL QR CODE GENERATOR</p>
          <QRCode value={text} className="qr" />
        <div className="form">
          <input
            type="text"
            id="qr-text"
            placeholder="ENTER URL OR TEXT"
          />
          <button onClick={handlegenerate}>Generate QR CODE</button>
        </div>
      </div>
    </div>
  );
}
