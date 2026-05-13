"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// ================= AI GENERATOR =================

export const generateAIInsights = async (industry) => {

  // 🛑 Safety check
  if (!industry) {
    throw new Error("Industry is missing. Please update your profile.");
  }

  const prompt = `
Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format:

{
  "salaryRanges": [
    { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
  ],
  "growthRate": number,
  "demandLevel": "HIGH" | "MEDIUM" | "LOW",
  "topSkills": ["skill1", "skill2"],
  "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
  "keyTrends": ["trend1", "trend2"],
  "recommendedSkills": ["skill1", "skill2"]
}

Return ONLY JSON. No extra text.
Include at least 5 roles, skills, and trends.
`;

  const result = await model.generateContent(prompt);

  const text = result.response.text();

  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

  return JSON.parse(cleanedText);
};

// ================= MAIN FUNCTION =================

export async function getIndustryInsights() {

  // ✅ Auth check
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // ✅ Get user
  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
    include: {
      industryInsight: true,
    },
  });

  if (!user) {
    throw new Error("User Not Found");
  }

  // 🛑 MAIN FIX: Check industry
  if (!user.industry) {
    throw new Error("Please update your profile and select an industry first.");
  }

  // ✅ If insight not exists → create
  if (!user.industryInsight) {

    const insights = await generateAIInsights(user.industry);

    const industryInsight = await db.industryInsight.create({
      data: {
        industry: user.industry,
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return industryInsight;
  }

  // ✅ If already exists → return
  return user.industryInsight;
}