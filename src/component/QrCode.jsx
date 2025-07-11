import React, { useState } from "react";
import './QrCode.css'

const QrCode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrdata] = useState("");
  const [qrSize, setQrSize] = useState("200"); 

  async function generateQR() {
    if (!qrData) {
      alert("Please enter data for QR code");
      return;
    }

    // Use default if empty or invalid
    const finalSize = qrSize.trim() === "" ? "200" : qrSize;

    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${finalSize}x${finalSize}&data=${encodeURIComponent(
        qrData
      )}`;
      setImg(url);
    } catch (err) {
      console.log("Error in generating QR code", err);
    } finally {
      setLoading(false);
    }
  }

  function downloadQR() {
    if (!img) return;

    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrCode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.log("Error in downloading QR code:", error);
      });
  }

  return (
    <>
      <div className="app-container">
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>Please wait...</p>}
        {img && <img src={img} alt="QR Code" className="qrImage" />}
        <div>
          <label htmlFor="dataInput" className="input-label">
            Data for QR code:
          </label>
          <input
            type="text"
            value={qrData}
            id="dataInput"
            placeholder="Enter data for QR code"
            onChange={(event) => setQrdata(event.target.value)}
          />

          <label htmlFor="sizeInput" className="input-label">
            Image size (e.g., 150):
          </label>
          <input
            type="number"
            value={qrSize}
            id="sizeInput"
            placeholder="Enter image size"
            onChange={(event) => setQrSize(event.target.value)}
          />

          <div className="buttonMobileView">
            <button
              className="generate-button"
              disabled={loading}
              onClick={generateQR}
            >
              Generate QR code
            </button>
            <button
              className="download-button"
              onClick={downloadQR}
              disabled={!img}
            >
              Download QR code
            </button>
          </div>
        </div>
        <div className="copyright">
          <p>
            Copyright © 2025
            <a href="https://github.com/Vikashverma2/"> Vikash Verma </a> All
            rights reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default QrCode;
