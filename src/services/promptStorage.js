import { db } from "../app/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const storePrompt = async (user, promptText, type, response = null) => {
  try {
    const promptData = {
      userId: user.uid,
      userEmail: user.email,
      userName: user.displayName,
      prompt: promptText,
      type: type, // 'generation' or 'enhancement'
      response: response,
      timestamp: serverTimestamp(),
    };

    await addDoc(collection(db, "prompts"), promptData);
  } catch (error) {
    console.error("Error storing prompt:", error);
    // Don't throw the error to prevent disrupting the main flow
  }
};
