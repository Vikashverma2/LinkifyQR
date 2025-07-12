import { useState } from "react";
import "./HomePage.css";

function ShortcutPage() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const shortenUrl = () => {
    if (!longUrl.trim()) return;

    const randomId = Math.random().toString(36).substring(2, 8);
    const fakeShort = `https://short.ly/${randomId}`;

    setShortUrl(fakeShort);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="homepage">  
    <div className="">
        <button>URL Shorter</button>
        <button>QR Code Generator</button>
    </div>
    <div className="shortcut-page">

        
      <div className="left-section">
        <h2>Meet Your New</h2>
        <h1>URL Shortcut!</h1>
        <p>
          Take control of your links with our all-in-one platform designed to
          simplify sharing and management.
        </p>
        
        <p className="note-text">Start for Free! No Card Required</p>
      </div>

      <div className="right-section">
        <div className="input-card">
          <input
            type="text"
            placeholder="Paste Your Link"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
          <button className="shorten-btn" onClick={shortenUrl}>↓</button>

          {shortUrl && (
            <>
              <div className="short-link-display">
                <strong>{shortUrl.replace("https://", "")}</strong>
                <span className="sub-link">{longUrl}</span>
              </div>
              <div className="action-buttons">
                <button onClick={handleCopy}>{copied ? "Copied!" : "Copy link"}</button>
                <button>Generate QR 📄</button>
              </div>
            </>
          )}
        </div>
        <div className="trusted">
          <p>Trusted by Leading Companies</p>
          <div className="logos">
            <span>Eventbrite</span>
            <span>Podium</span>
            <span>Zendesk</span>
            <span>Databricks</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ShortcutPage;
