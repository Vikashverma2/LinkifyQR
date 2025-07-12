import axios from "axios";
import React, { useState } from "react";

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateShortUrl = async () => {
    if (!longUrl.trim()) {
      alert("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setShortUrl("");
    setCopied(false);

    try {
      const response = await axios.get(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
      );

      setShortUrl(response.data);
    } catch (err) {
      console.error("Error shortening URL:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true);
      setLongUrl("");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="tool-card">
      <h2>URL Shortener</h2>
      <input
        type="text"
        placeholder="Paste Your Link"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
      />
      <button onClick={generateShortUrl} disabled={loading}>
        {loading ? "Shortening..." : "Generate"}
      </button>

      {shortUrl && (
        <>
          <div className="short-link-display">
            <strong>{shortUrl.replace("https://", "")}</strong>
          </div>
          <div className="action-buttons">
            <button className="blue-button" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy link"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UrlShortener;
