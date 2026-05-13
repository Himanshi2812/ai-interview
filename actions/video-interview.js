"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function generateQuestions() {

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  })

  const prompt = `
Generate exactly 2 very short technical interview question for a Computer Science student.

Topics:
SQL, Python, DBMS, OOP, Data Structures.

Rules:
- Maximum 6 words
- Beginner friendly
- No explanation
- Return ONLY JSON array

Example:
[
"What is SQL JOIN?"
]
`

  const result = await model.generateContent(prompt)

  let text = result.response.text()

  text = text.replace(/```json|```/g, "").trim()

  try {

    const questions = JSON.parse(text)

    return questions.map(q => {
      const short = q.split("?")[0]
      return short + "?"
    })

  } catch {

    // safe fallback without hardcoded topic feedback
    return ["What is polymorphism?"]

  }

}


export async function evaluateAnswers(data) {

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  })

  const prompt = `
You are a technical interviewer.

Evaluate the candidate answer.

Interview data:
${JSON.stringify(data)}

Instructions:
- Give score out of 10
- Give 1–2 sentence feedback
- Mention concept improvement if needed

Return ONLY JSON:

{
 "score": number,
 "feedback": "string"
}
`

  const result = await model.generateContent(prompt)

  let text = result.response.text()

  text = text.replace(/```json|```/g, "").trim()

  try {

    return JSON.parse(text)

  } catch {

    
    const start = text.indexOf("{")
    const end = text.lastIndexOf("}")

    if (start !== -1 && end !== -1) {

      const cleaned = text.substring(start, end + 1)

      return JSON.parse(cleaned)

    }

    throw new Error("Failed to parse Gemini response")

  }

}