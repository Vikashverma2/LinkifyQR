import { useState } from "react";
import axios from "axios";
import "./UrlShortener.css";

function UrlShortener() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generateShortUrl = async () => {
    if (!longUrl.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const response = await axios.get(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
      );

      setShortUrl(response.data);
      setLongUrl("");
    } catch (err) {
      console.error(err);
      setError("Failed to shorten URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="url-container">
      <h1>URL Shortener</h1>
      <input
        type="text"
        placeholder="Enter your long URL..."
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
      />
      <button onClick={generateShortUrl} disabled={loading}>
        {loading ? "Shortening..." : "Shorten"}
      </button>

      {error && <p className="error-text">{error}</p>}

      {shortUrl && (
        <div className="short-url-box">
          <p>Shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
          <button onClick={handleCopy} className="copy-btn">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}

export default UrlShortener;
