// "use server";

// import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// /* =========================
//    Gemini Setup
// ========================= */

// if (!process.env.GEMINI_API_KEY) {
//   throw new Error("Missing GEMINI_API_KEY in .env file");
// }

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// /* =========================
//    Generate Cover Letter
// ========================= */

// export async function generateCoverLetter(data) {

//   const { userId } = await auth();
//   if (!userId) throw new Error("Unauthorized");

//   const user = await db.user.findUnique({
//     where: { clerkUserId: userId },
//   });

//   if (!user) throw new Error("User not found");

//   const industry = user.industry || "Not specified";
//   const experience = user.experience || "Not specified";

//   const skills = Array.isArray(user.skills)
//     ? user.skills.join(", ")
//     : user.skills || "Not specified";

//   const bio = user.bio || "Not specified";

//   const prompt = `
// Write a professional cover letter.

// Job Title: ${data.jobTitle}
// Company: ${data.companyName}

// Candidate:
// Industry: ${industry}
// Experience: ${experience}
// Skills: ${skills}
// Background: ${bio}

// Job Description:
// ${data.jobDescription}

// Write 3 paragraphs.
// Maximum 400 words.
// Start with "Dear Hiring Manager".
// End with "Sincerely".
// `;

//   try {

//     const result = await model.generateContent(prompt);
//     const response = await result.response;

//     let content = response.text();

//     if (!content || content.length < 20) {
//       throw new Error("AI failed to generate cover letter");
//     }

//     content = content
//       .replace(/```markdown/gi, "")
//       .replace(/```/g, "")
//       .trim();

//     const coverLetter = await db.coverLetter.create({
//       data: {
//         content,
//         jobDescription: data.jobDescription,
//         companyName: data.companyName,
//         jobTitle: data.jobTitle,
//         userId: user.id,
//       },
//     });

//     return coverLetter;

//   } catch (error) {
//     console.error("Cover Letter Error:", error);
//     throw new Error("Failed to generate cover letter");
//   }
// }

// /* =========================
//    Get All Cover Letters
// ========================= */

// export async function getCoverLetters() {

//   const { userId } = await auth();
//   if (!userId) return [];

//   const user = await db.user.findUnique({
//     where: { clerkUserId: userId },
//   });

//   if (!user) return [];

//   return await db.coverLetter.findMany({
//     where: { userId: user.id },
//     orderBy: { createdAt: "desc" },
//   });
// }

// /* =========================
//    Get Single Cover Letter
// ========================= */

// export async function getCoverLetter(id) {

//   const { userId } = await auth();
//   if (!userId) return null;

//   const user = await db.user.findUnique({
//     where: { clerkUserId: userId },
//   });

//   if (!user) return null;

//   return await db.coverLetter.findFirst({
//     where: {
//       id,
//       userId: user.id,
//     },
//   });
// }

// /* =========================
//    Delete Cover Letter
// ========================= */

// export async function deleteCoverLetter(id) {

//   const { userId } = await auth();
//   if (!userId) throw new Error("Unauthorized");

//   const user = await db.user.findUnique({
//     where: { clerkUserId: userId },
//   });

//   if (!user) throw new Error("User not found");

//   return await db.coverLetter.delete({
//     where: { id },
//   });
// }

"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

/* =========================
   Gemini Setup
========================= */

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in .env file");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

/* =========================
   Generate Cover Letter
========================= */

export async function generateCoverLetter(data) {

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const industry = user.industry ?? "Not specified";
  const experience = user.experience ?? "Not specified";

  const skills = Array.isArray(user.skills)
    ? user.skills.join(", ")
    : user.skills ?? "Not specified";

  const bio = user.bio ?? "Not specified";

  const prompt = `
Write a professional cover letter.

Job Title: ${data.jobTitle}
Company: ${data.companyName}

Candidate:
Industry: ${industry}
Experience: ${experience}
Skills: ${skills}
Background: ${bio}

Job Description:
${data.jobDescription}

Write 3 paragraphs.
Maximum 400 words.
Start with "Dear Hiring Manager".
End with "Sincerely".
`;

  try {

    const result = await model.generateContent(prompt);

    const text =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      result?.response?.text?.() ||
      "";

    if (!text || text.length < 20) {
      throw new Error("AI failed to generate content");
    }

    const content = text
      .replace(/```markdown/gi, "")
      .replace(/```/g, "")
      .trim();

    const coverLetter = await db.coverLetter.create({
      data: {
        content,
        jobDescription: data.jobDescription,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        userId: user.id,
      },
    });

    return coverLetter;

  } catch (error) {
    console.error("Cover Letter Error:", error);
    throw error;
  }
}


/* =========================
   Get All Cover Letters
========================= */

export async function getCoverLetters() {

  const { userId } = await auth();
  if (!userId) return [];

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) return [];

  return db.coverLetter.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}


/* =========================
   Get Single Cover Letter
========================= */

export async function getCoverLetter(id) {

  const { userId } = await auth();
  if (!userId) return null;

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) return null;

  return db.coverLetter.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });
}


/* =========================
   Delete Cover Letter
========================= */

export async function deleteCoverLetter(id) {

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return db.coverLetter.delete({
    where: { id },
  });
}

