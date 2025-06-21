export async function evaluateWithOpenAI(userAnswer, rubricText) {
  const response = await fetch("/api/evaluate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: userAnswer,
      rubric: rubricText
    })
  });

  const data = await response.json();
  return data.result;
}
