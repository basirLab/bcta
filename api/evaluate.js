const express = require("express");
const cors = require("cors");
const { evaluateAnswer } = require("./openai");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/gpt-evaluate", async (req, res) => {
  const { question, answer, rubric, tags } = req.body;

  try {
    const evaluation = await evaluateAnswer(question, answer, rubric, tags || []);
    res.json(evaluation);
  } catch (e) {
    console.error("OpenAI 평가 실패:", e);
    res.status(500).json({ error: "GPT 평가 실패" });
  }
});

app.listen(3000, () => {
  console.log("서버가 http://localhost:3000 에서 실행 중");
});
