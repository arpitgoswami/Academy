import { db } from "../app/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const getUserPrompts = async (user) => {
  try {
    const promptsRef = collection(db, "prompts");
    const q = query(promptsRef, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);

    const prompts = [];
    querySnapshot.forEach((doc) => {
      prompts.push({ id: doc.id, ...doc.data() });
    });

    return prompts;
  } catch (error) {
    console.error("Error fetching user prompts:", error);
    return [];
  }
};
