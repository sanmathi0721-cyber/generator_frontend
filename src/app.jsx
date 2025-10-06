const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

export async function generate(payload) {
  const res = await fetch(`${API_BASE}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
