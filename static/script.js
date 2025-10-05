document.getElementById("generateBtn").addEventListener("click", async () => {
  const contentType = document.getElementById("contentType").value;
  const topic = document.getElementById("topic").value;
  const tone = document.getElementById("tone").value;
  const wordCount = document.getElementById("wordCount").value;

  if (!topic.trim()) {
    alert("Please enter a topic!");
    return;
  }

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "⏳ Generating content... please wait.";

  const response = await fetch("https://ai-content-generator-4-y5cv.onrender.com/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: contentType, topic, tone, word_count: wordCount }),
  });

  const data = await response.json();

  if (data.result) {
    resultDiv.innerHTML = data.result;
  } else {
    resultDiv.innerHTML = `❌ Error: ${data.error}`;
  }
});
