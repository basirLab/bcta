// api/evaluate.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { message, rubric } = req.body;

  const openaiApiKey = process.env.OPENAI_API_KEY;
  if (!openaiApiKey) {
    return res.status(500).json({ error: 'Missing OpenAI API key' });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: rubric },
          { role: "user", content: message }
        ],
        temperature: 0.2
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response";

    res.status(200).json({ result: reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'OpenAI API request failed' });
  }
}
