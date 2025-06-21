const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function evaluateAnswer(question, answer, rubric, tags) {
  const prompt = `
[질문]
${question}

[응답]
${answer}

[평가기준]
${rubric}

[태그]
${tags.join(", ")}

각 항목 CT1~CT6에 대해 1~4점으로 평가하고, 평가 이유를 아래 JSON 형식으로 작성해줘:

{
  "CT1": { "score": 3, "feedback": "..." },
  "CT2": { "score": 2, "feedback": "..." },
  ...
}
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2
  });

  return JSON.parse(res.choices[0].message.content);
}

module.exports = { evaluateAnswer };
