// frontend/src/App.jsx
import React, { useState } from "react";
import "./styles.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/generate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        }
      );

      const data = await res.json();
      setOutput(data.output || "No response");
    } catch (err) {
      setOutput("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🧠 AI Content Generator</h1>

      <label>Enter your topic:</label>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g. Artificial Intelligence in Healthcare"
      />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Content"}
      </button>

      <div className="output">
        <h3>Generated Output:</h3>
        <p>{output}</p>
      </div>
    </div>
  );
}

export default App; // ✅ THIS LINE IS REQUIRED
