const API_BASE = process.env.REACT_APP_API_URL || "delightful-blessing-production-4318.up.railway.app";

export async function generate(payload) {
  const res = await fetch(`${API_BASE}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
