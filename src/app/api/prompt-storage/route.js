import { db } from "../../../app/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { user, promptText, type, response } = await request.json();

    if (!user || !promptText || !type) {
      return NextResponse.json(
        { error: "User, promptText, and type are required" },
        { status: 400 }
      );
    }

    const promptData = {
      userId: user.uid,
      userEmail: user.email,
      userName: user.displayName,
      prompt: promptText,
      type: type, // 'generation' or 'enhancement'
      response: response,
      timestamp: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "prompts"), promptData);

    return NextResponse.json({
      success: true,
      message: "Prompt stored successfully",
      docId: docRef.id,
    });
  } catch (error) {
    console.error("Error storing prompt:", error);
    return NextResponse.json(
      { error: "Error storing prompt" },
      { status: 500 }
    );
  }
}
