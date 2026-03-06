import { Groq } from "groq-sdk";
import { ResumeDetails } from "./types";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "dummy-key-for-build",
});

export async function optimizeResumeAndScore(resumeData: ResumeDetails) {
  const prompt = `
You are an expert ATS (Applicant Tracking System) optimizer and professional resume writer.
I am providing you with the details of a user's resume and their target job role.

Target Job Role: ${resumeData.targetJobRole}
Current Resume Details in JSON:
${JSON.stringify({
  personalDetails: resumeData.personalDetails,
  education: resumeData.education,
  skills: resumeData.skills,
  experience: resumeData.experience,
  projects: resumeData.projects
})}

Task:
1. Revise the "description" fields within "experience" and "projects" to be highly professional, impactful, action-oriented, and ATS-friendly for the Target Job Role. 
2. Determine an ATS Score (out of 100) based on how well the existing skills and experience match the typical requirements of the Target Job Role.
3. Identify 3-5 crucial industry missing keywords or skills that the user should consider learning or adding if they have experience with them.
4. Provide up to 3 formatting or structural suggestions.
5. Provide up to 3 overall content improvement suggestions.

Return your response ONLY in the following JSON format:
{
  "optimizedExperience": [
    { "company": "...", "role": "...", "startDate": "...", "endDate": "...", "description": "optimized text..." }
  ],
  "optimizedProjects": [
    { "name": "...", "link": "...", "technologies": ["..."], "description": "optimized text..." }
  ],
  "atsScore": {
    "score": 85,
    "missingKeywords": ["keyword1", "keyword2"],
    "formattingSuggestions": ["suggestion1"],
    "contentSuggestions": ["suggestion1"]
  }
}

Do not include any other text except the JSON response.
`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const responseContent = chatCompletion.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error("No response from AI");
    }

    const parsedResponse = JSON.parse(responseContent);
    return parsedResponse;
  } catch (error) {
    console.error("Error optimizing resume:", error);
    throw error;
  }
}
