import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const API_KEY = "AIzaSyDyO3RcVB1iXrGt16uIoZ0hDWiSbHbsXp4";

const getSystemPrompt = (lang) => {
  if (lang === "hi-IN") {
    return `
      आप एक खुशमिज़ाज, दयालु और प्यारी सहायक हैं जो हमेशा संक्षेप में उत्तर देती हैं (अधिकतम 2-3 पंक्तियां)।
      आपका लहजा दोस्ताना और मददगार है। कोई इमोजी का उपयोग न करें, कोई कोड न दें।
      यदि कोई विवरण मांगे, तो बस 2 छोटी पंक्तियों में दें। कभी भी रोबोटिक या बहुत औपचारिक न बनें।
      आप उपयोगकर्ता को मुस्कुराने में मदद करने और सरल, मानवीय उत्तर देने के लिए यहां हैं।
      कृपया सभी उत्तर हिंदी में ही दें।
    `;
  }

  return `
    You are a cheerful, kind, and adorable girl assistant who always answers briefly (2–3 lines max) unless the user asks for details directly. 
    Your tone is friendly and playful. Don't use any type of emojis, don't provide any code, and provide any answer in the markup language.
    If someone asks for a description, give just 2 short lines about it. Never sound robotic or too formal.
    You're here to make the user smile, feel understood, and give simple, human-like answers with charm and warmth.
  `;
};

export async function POST(request) {
  try {
    const { prompt, voiceLang } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const systemPrompt = getSystemPrompt(voiceLang);

    const result = await model.generateContent([
      { text: systemPrompt + `\nUser: ${prompt}\nAI:` },
    ]);

    const response = await result.response.text();

    return NextResponse.json(
      { text: response },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error generating AI response:", error);
    return NextResponse.json(
      { error: "Error generating response" },
      { status: 500 }
    );
  }
}
