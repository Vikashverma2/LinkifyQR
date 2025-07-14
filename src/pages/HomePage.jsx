import React, { useState } from "react";
import UrlShortener from "../component/UrlShortener";
import QrCodeGenerator from "../component/QrCode";
import "./HomePage.css";

function Homepage() {
  const [activeTool, setActiveTool] = useState("url");

  return (
    <div className="homepage">

      <div className="shortcut-page">
        <div className="left-section">
          <div className="top-buttons">
            <button
              onClick={() => setActiveTool("url")}
              className={activeTool === "url" ? "active-btn" : ""}
            >
              URL Shortener
            </button>
            <button
              onClick={() => setActiveTool("qr")}
              className={activeTool === "qr" ? "active-btn" : ""}
            >
              QR Code Generator
            </button>
          </div>

          <h2>Meet Your New</h2>
          <h1>
            {activeTool === "url" ? "URL Shortcut!" : "QR Code Generator!"}
          </h1>
          <p>
            {activeTool === "url"
              ? "Turn those long, messy URLs into clean, catchy shortcuts in just one click. Perfect for sharing anywhere — social media, emails, or surprise notes! Fast, easy, and totally free. ✨🚀"
              : "Turn anything into a scannable magic square! Make quick, fun, and free QR codes for your links or text in seconds. 🚀✨"}
          </p>

          <p className="note-text">Start for Free!</p>
        </div>

        <div className="right-section">
          {activeTool === "url" ? <UrlShortener /> : <QrCodeGenerator />}
        </div>
      </div>
      <div className="footer-text">
        <p>
          Copyright © 2025
          <a href="https://github.com/Vikashverma2/"> Vikash Verma </a> All
          rights reserved
        </p>
      </div>
    </div>
  );
}

export default Homepage;
