import React, { useState } from "react";
import "./QrCode.css";

const QrCode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("");
  const [qrSize, setQrSize] = useState("200");

  async function generateQR() {
    if (!qrData) {
      alert("Please enter data for QR code");
      return;
    }

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

    
      setQrData("");
      setQrSize("200");
      setImg("");
    })
    .catch((error) => {
      console.log("Error in downloading QR code:", error);
    });
}


  return (
    <div className="qr-page-container">
      <div className="qr-card">
        <h2>QR Code Generator</h2>
        <p className="description">
          Instantly create and download custom QR codes for your links or text. Fast, simple, and free!
        </p>

        {loading && <p>Generating...</p>}
        {img && <img src={img} alt="QR Code" className="qr-image" />}

        <input
          type="text"
          value={qrData}
          placeholder="Enter data or URL"
          onChange={(e) => setQrData(e.target.value)}
        />
        <input
          type="number"
         
          placeholder="Size (e.g., 200)"
          onChange={(e) => setQrSize(e.target.value)}
        />

        <div className="button-group">
          <button
            className="generate-btn"
            disabled={loading}
            onClick={generateQR}
          >
            Generate
          </button>
          <button
            className="download-btn"
            onClick={downloadQR}
            disabled={!img}
          >
            Download
          </button>
        </div>

       
      </div>
    </div>
  );
};

export default QrCode;
