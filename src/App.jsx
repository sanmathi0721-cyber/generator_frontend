import React, { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BACKEND_URL = "https://ai-content-generator-9.onrender.com";

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a topic to generate content.");
      return;
    }

    setLoading(true);
    setError("");
    setOutput("");

    try {
      const res = await fetch(`${BACKEND_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate content");
      }

      setOutput(data.output);
    } catch (err) {
      console.error("❌ Fetch Error:", err);
      setError("Failed to connect to backend. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>✨ AI Content Generator</h1>
      <p className="subtitle">Create creative content instantly — powered by AI</p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a topic (e.g., Benefits of AI in Education)"
      />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Content"}
      </button>

      {error && <p className="error">{error}</p>}

      {output && (
        <div className="output-box">
          <h3>🧠 Generated Content:</h3>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
}

export default App;
