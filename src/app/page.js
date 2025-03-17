"use client";

import React, { useRef, useState, useEffect } from "react";
import { SiChatbot } from "react-icons/si";
import { BiSend, BiMoon, BiSun } from "react-icons/bi";
import { FaGoogle, FaUserFriends, FaRobot } from "react-icons/fa";
import { MdAttachFile, MdClose, MdMenu } from "react-icons/md";
import { GoogleGenerativeAI } from "@google/generative-ai";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const GEMINI_API_KEY = "AIzaSyDyO3RcVB1iXrGt16uIoZ0hDWiSbHbsXp4";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

firebase.initializeApp({
  apiKey: "AIzaSyBl1ClScZmSLxKFiybmwMF9Qq7KLdiVqvg",
  authDomain: "reactfirebase-f43b8.firebaseapp.com",
  projectId: "reactfirebase-f43b8",
  storageBucket: "reactfirebase-f43b8.appspot.com",
  messagingSenderId: "1061604612002",
  appId: "1:1061604612002:web:517a0b03e18c17604cc4fb",
  measurementId: "G-Y74RT8HTXJ",
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [user] = useAuthState(auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChat, setActiveChat] = useState("public");
  const [aiAssistants, setAiAssistants] = useState([
    {
      id: "gemini",
      name: "Gemini AI",
      avatar: "https://ui-avatars.com/api/?name=G&background=4f46e5&color=fff",
    },
    {
      id: "claude",
      name: "Claude",
      avatar: "https://ui-avatars.com/api/?name=C&background=6366f1&color=fff",
    },
  ]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      } transition-colors duration-200`}
    >
      {user ? (
        <div className="flex h-screen">
          {/* Sidebar */}
          <div
            className={`${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full md:translate-x-0"
            } 
                       fixed md:relative z-20 h-full w-72 transition-transform duration-300 ease-in-out
                       ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}
          >
            <div
              className={`p-4 flex justify-between items-center border-b ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex items-center space-x-2">
                <SiChatbot className="text-2xl text-blue-500" />
                <h1 className="text-xl font-bold">Nexsync</h1>
              </div>
              <button
                className="md:hidden text-xl p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setSidebarOpen(false)}
              >
                <MdClose />
              </button>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={
                    auth.currentUser?.photoURL ||
                    "https://ui-avatars.com/api/?name=User&background=random"
                  }
                  className="w-10 h-10 rounded-full"
                  alt="Profile"
                />
                <div>
                  <div className="font-medium">
                    {auth.currentUser?.displayName || "User"}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Online
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2
                  className={`text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  CHATS
                </h2>
                <div
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer mb-1
                             ${
                               activeChat === "public"
                                 ? darkMode
                                   ? "bg-gray-700"
                                   : "bg-blue-50 text-blue-700"
                                 : darkMode
                                 ? "hover:bg-gray-700"
                                 : "hover:bg-gray-100"
                             }`}
                  onClick={() => setActiveChat("public")}
                >
                  <FaUserFriends
                    className={activeChat === "public" ? "text-blue-500" : ""}
                  />
                  <div>Public Chat</div>
                </div>
              </div>

              <div>
                <h2
                  className={`text-sm font-medium mb-2 flex justify-between items-center ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <span>AI ASSISTANTS</span>
                </h2>

                {aiAssistants.map((assistant) => (
                  <div
                    key={assistant.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer mb-1
                               ${
                                 activeChat === assistant.id
                                   ? darkMode
                                     ? "bg-gray-700"
                                     : "bg-blue-50 text-blue-700"
                                   : darkMode
                                   ? "hover:bg-gray-700"
                                   : "hover:bg-gray-100"
                               }`}
                    onClick={() => setActiveChat(assistant.id)}
                  >
                    <img
                      src={assistant.avatar}
                      className="w-8 h-8 rounded-full"
                      alt={assistant.name}
                    />
                    <div>{assistant.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <button
                  className={`p-2 rounded-full ${
                    darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={toggleDarkMode}
                >
                  {darkMode ? <BiSun /> : <BiMoon />}
                </button>
                <SignOut darkMode={darkMode} />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col h-full w-full">
            <header
              className={`py-3 px-4 flex items-center gap-3 shadow-sm ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <button
                className="md:hidden text-xl"
                onClick={() => setSidebarOpen(true)}
              >
                <MdMenu />
              </button>

              {activeChat === "public" ? (
                <div className="flex items-center gap-3">
                  <FaUserFriends className="text-blue-500" />
                  <div>
                    <div className="font-medium">Public Chat</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Everyone can join
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <img
                    src={aiAssistants.find((a) => a.id === activeChat)?.avatar}
                    className="w-8 h-8 rounded-full"
                    alt="AI"
                  />
                  <div>
                    <div className="font-medium">
                      {aiAssistants.find((a) => a.id === activeChat)?.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      AI Assistant
                    </div>
                  </div>
                </div>
              )}
            </header>

            <ChatRoom
              activeChat={activeChat}
              darkMode={darkMode}
              aiAssistants={aiAssistants}
            />
          </div>
        </div>
      ) : (
        <SignIn darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      )}
    </div>
  );
}

function SignIn({ darkMode, toggleDarkMode }) {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-center">
        {/* Left side content */}
        <div className="w-full md:w-1/2 text-center md:text-left py-8 md:py-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              NexSync
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-700 dark:text-gray-300 mb-6">
            Connect seamlessly. Chat effortlessly.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
            Experience next-generation communication with friends or AI
            assistants, all in one beautifully designed platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button
              className="w-full sm:w-auto py-4 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg"
              onClick={signInWithGoogle}
            >
              <FaGoogle className="text-lg" /> Sign in with Google
            </button>
            <button className="w-full sm:w-auto py-4 px-8 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-medium rounded-xl border border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg">
              Learn More
            </button>
          </div>

          <p className="text-sm text-center md:text-left mt-6 text-gray-500 dark:text-gray-400">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

        {/* Right side illustration/image */}
        <div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
          <div className="relative w-full max-w-md">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-200 dark:bg-blue-900 rounded-full opacity-50"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-200 dark:bg-indigo-900 rounded-full opacity-50"></div>

            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
              <div className="flex justify-end mb-4">
                <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  {darkMode ? (
                    <BiSun className="text-xl" />
                  ) : (
                    <BiMoon className="text-xl" />
                  )}
                </button>
              </div>

              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center shadow-inner">
                  <SiChatbot className="text-5xl text-blue-600 dark:text-blue-400" />
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex-shrink-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg rounded-tl-none">
                    <p className="text-gray-800 dark:text-gray-200">
                      Hi there! How can I help you today?
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-blue-600 p-3 rounded-lg rounded-tr-none">
                    <p className="text-white">
                      I'd like to know more about your AI features.
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex-shrink-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dark mode toggle - fixed position */}
      <button
        className="fixed top-4 right-4 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg text-gray-700 dark:text-gray-200"
        onClick={toggleDarkMode}
      >
        {darkMode ? (
          <BiSun className="text-xl" />
        ) : (
          <BiMoon className="text-xl" />
        )}
      </button>
    </div>
  );
}

function SignOut({ darkMode }) {
  return (
    auth.currentUser && (
      <button
        className={`px-4 py-2 rounded-lg ${
          darkMode
            ? "bg-gray-700 hover:bg-gray-600 text-white"
            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
        } transition-colors`}
        onClick={() => auth.signOut()}
      >
        Sign Out
      </button>
    )
  );
}

function ChatRoom({ activeChat, darkMode, aiAssistants }) {
  const dummy = useRef();
  const fileInputRef = useRef();
  const [formValue, setFormValue] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAiResponding, setIsAiResponding] = useState(false);

  const messagesRef =
    activeChat.startsWith("gemini") || activeChat.startsWith("claude")
      ? firestore.collection(`ai_chats/${auth.currentUser.uid}/${activeChat}`)
      : firestore.collection("messages");

  const query = messagesRef.orderBy("createdAt").limit(50);
  const [messages] = useCollectionData(query, { idField: "id" });

  const getChatHistory = () => {
    if (!messages) return "";

    const recentMessages = [...messages].slice(-10);

    return recentMessages
      .map((msg) => {
        const role = msg.uid === auth.currentUser.uid ? "user" : "assistant";
        return `${role}: ${msg.text}`;
      })
      .join("\n");
  };

  const getGeminiResponse = async (prompt) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const chatHistory = getChatHistory();
      const fullPrompt = chatHistory
        ? `Previous conversation:\n${chatHistory}\n\nUser: ${prompt}\nAssistant:`
        : prompt;

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error with Gemini API:", error);
      return "I'm having trouble connecting right now. Please try again in a moment.";
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) return null;

    setIsUploading(true);
    setUploadProgress(0);

    const storageRef = storage.ref();
    const fileRef = storageRef.child(
      `files/${auth.currentUser.uid}/${Date.now()}_${selectedFile.name}`
    );

    try {
      const uploadTask = fileRef.put(selectedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          setIsUploading(false);
        },
        async () => {
          const fileUrl = await uploadTask.snapshot.ref.getDownloadURL();
          setIsUploading(false);
          setSelectedFile(null);
          return fileUrl;
        }
      );

      return uploadTask.then((snapshot) => snapshot.ref.getDownloadURL());
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsUploading(false);
      return null;
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!formValue && !selectedFile) return;
    if (isAiResponding) return;

    const { uid, photoURL, displayName } = auth.currentUser;
    let fileUrl = null;
    const userMessage = formValue;

    if (selectedFile) {
      fileUrl = await uploadFile();
    }

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName: displayName || "User",
      fileUrl,
      fileName: selectedFile?.name || null,
      fileType: selectedFile?.type || null,
    });

    setFormValue("");
    setSelectedFile(null);
    dummy.current.scrollIntoView({ behavior: "smooth" });

    if (activeChat === "gemini") {
      setIsAiResponding(true);

      const typingRef = await messagesRef.add({
        text: "...",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid: `ai-${activeChat}`,
        photoURL: aiAssistants.find((a) => a.id === activeChat).avatar,
        displayName: aiAssistants.find((a) => a.id === activeChat).name,
        isAi: true,
        isTyping: true,
      });

      try {
        const aiResponse = await getGeminiResponse(userMessage);

        await typingRef.delete();

        await messagesRef.add({
          text: aiResponse,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid: `ai-${activeChat}`,
          photoURL: aiAssistants.find((a) => a.id === activeChat).avatar,
          displayName: aiAssistants.find((a) => a.id === activeChat).name,
          isAi: true,
        });
      } catch (error) {
        console.error("Error with AI response:", error);

        await typingRef.delete();

        await messagesRef.add({
          text: "Sorry, I encountered an error. Please try again.",
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid: `ai-${activeChat}`,
          photoURL: aiAssistants.find((a) => a.id === activeChat).avatar,
          displayName: aiAssistants.find((a) => a.id === activeChat).name,
          isAi: true,
        });
      } finally {
        setIsAiResponding(false);
        dummy.current.scrollIntoView({ behavior: "smooth" });
      }
    } else if (activeChat === "claude") {
      setIsAiResponding(true);

      const typingRef = await messagesRef.add({
        text: "...",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid: `ai-${activeChat}`,
        photoURL: aiAssistants.find((a) => a.id === activeChat).avatar,
        displayName: aiAssistants.find((a) => a.id === activeChat).name,
        isAi: true,
        isTyping: true,
      });

      setTimeout(async () => {
        await typingRef.delete();

        await messagesRef.add({
          text: "This is a simulated Claude response. To implement Claude integration, you would need to use the Anthropic API.",
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid: `ai-${activeChat}`,
          photoURL: aiAssistants.find((a) => a.id === activeChat).avatar,
          displayName: aiAssistants.find((a) => a.id === activeChat).name,
          isAi: true,
        });

        setIsAiResponding(false);
        dummy.current.scrollIntoView({ behavior: "smooth" });
      }, 1500);
    }
  };

  return (
    <>
      <main
        className={`flex-1 p-4 overflow-y-auto ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {messages &&
            messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                darkMode={darkMode}
                isAiChat={
                  activeChat.startsWith("gemini") ||
                  activeChat.startsWith("claude")
                }
              />
            ))}
        </div>
        <span ref={dummy}></span>
      </main>

      {selectedFile && (
        <div
          className={`px-4 py-3 ${
            darkMode ? "bg-gray-800" : "bg-white"
          } border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <div
            className={`flex items-center justify-between max-w-3xl mx-auto p-2 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="shrink-0">
                <MdAttachFile className="text-blue-500" />
              </div>
              <div className="truncate">
                <div className="text-sm font-medium truncate">
                  {selectedFile.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </div>
              </div>
            </div>
            <button
              className="shrink-0 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
              onClick={() => setSelectedFile(null)}
            >
              <MdClose />
            </button>
          </div>

          {isUploading && (
            <div className="max-w-3xl mx-auto mt-2">
              <div className="h-1 w-full bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}

      <form onSubmit={sendMessage} className="shrink-0">
        <div
          className={`p-4 border-t ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="max-w-3xl mx-auto flex items-center gap-2">
            <button
              type="button"
              className={`p-3 rounded-full ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
              onClick={() => fileInputRef.current.click()}
              disabled={isAiResponding}
            >
              <MdAttachFile
                className={`${darkMode ? "text-gray-300" : "text-gray-600"} ${
                  isAiResponding ? "opacity-50" : ""
                }`}
              />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              disabled={isAiResponding}
            />

            <input
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder={
                isAiResponding
                  ? "AI is responding..."
                  : activeChat.startsWith("gemini") ||
                    activeChat.startsWith("claude")
                  ? `Message ${
                      aiAssistants.find((a) => a.id === activeChat)?.name
                    }...`
                  : "Type a message..."
              }
              className={`flex-1 py-3 px-4 rounded-full outline-none ${
                darkMode
                  ? "bg-gray-700 text-white placeholder-gray-400"
                  : "bg-gray-100 text-gray-800 placeholder-gray-500"
              } ${isAiResponding ? "opacity-70" : ""}`}
              disabled={isAiResponding}
            />

            <button
              className={`p-3 rounded-full ${
                (formValue || selectedFile) && !isAiResponding
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : darkMode
                  ? "bg-gray-700 text-gray-400"
                  : "bg-gray-200 text-gray-500"
              } transition-colors ${
                isAiResponding ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={(!formValue && !selectedFile) || isAiResponding}
            >
              <BiSend className="text-xl" />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

function ChatMessage({ message, darkMode, isAiChat }) {
  const {
    text,
    uid,
    photoURL,
    createdAt,
    displayName,
    fileUrl,
    fileName,
    fileType,
    isAi,
    isTyping,
  } = message;
  const [time, setTime] = useState("");
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    if (createdAt) {
      const messageDate = createdAt.toDate();
      const formattedTime = messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(formattedTime);

      const updateTimeAgo = () => {
        const now = new Date();
        const diffInSeconds = Math.floor((now - messageDate) / 1000);

        if (diffInSeconds < 60) {
          setTimeAgo("just now");
        } else if (diffInSeconds < 3600) {
          const minutes = Math.floor(diffInSeconds / 60);
          setTimeAgo(`${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`);
        } else if (diffInSeconds < 86400) {
          const hours = Math.floor(diffInSeconds / 3600);
          setTimeAgo(`${hours} ${hours === 1 ? "hour" : "hours"} ago`);
        } else {
          const days = Math.floor(diffInSeconds / 86400);
          setTimeAgo(`${days} ${days === 1 ? "day" : "days"} ago`);
        }
      };

      updateTimeAgo();
      const intervalId = setInterval(updateTimeAgo, 60000);

      return () => clearInterval(intervalId);
    }
  }, [createdAt]);

  const isCurrentUser = uid === auth.currentUser.uid;
  const isAiMessage = isAiChat && (isAi || uid.startsWith("ai-"));

  if (isTyping) {
    return (
      <div className="flex justify-start">
        <div className="max-w-xs sm:max-w-md flex flex-row gap-2">
          <img
            src={
              photoURL ||
              "https://ui-avatars.com/api/?name=User&background=random"
            }
            className="w-8 h-8 rounded-full object-cover shrink-0 mt-1"
            alt={displayName || "User"}
          />
          <div
            className={`p-3 rounded-lg ${
              darkMode ? "bg-indigo-600 text-white" : "bg-indigo-500 text-white"
            }`}
          >
            <div className="flex space-x-1">
              <div
                className="w-2 h-2 rounded-full bg-white animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-2 h-2 rounded-full bg-white animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
              <div
                className="w-2 h-2 rounded-full bg-white animate-bounce"
                style={{ animationDelay: "600ms" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs sm:max-w-md flex ${
          isCurrentUser ? "flex-row-reverse" : "flex-row"
        } gap-2`}
      >
        {!isCurrentUser && (
          <img
            src={
              photoURL ||
              "https://ui-avatars.com/api/?name=User&background=random"
            }
            className="w-8 h-8 rounded-full object-cover shrink-0 mt-1"
            alt={displayName || "User"}
          />
        )}

        <div
          className={`space-y-1 ${isCurrentUser ? "items-end" : "items-start"}`}
        >
          {!isCurrentUser && !isAiMessage && (
            <div
              className={`text-xs font-medium ${
                darkMode ? "text-gray-400" : "text-gray-500"
              } ml-1`}
            >
              {displayName || "User"}
            </div>
          )}

          {fileUrl && (
            <div
              className={`rounded-lg overflow-hidden ${
                isCurrentUser
                  ? darkMode
                    ? "bg-blue-600"
                    : "bg-blue-500"
                  : darkMode
                  ? "bg-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              {fileType?.startsWith("image/") ? (
                <div className="relative">
                  <img
                    src={fileUrl}
                    alt={fileName}
                    className="max-h-60 w-auto object-contain"
                  />
                </div>
              ) : (
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 flex items-center gap-2"
                >
                  <MdAttachFile className="text-blue-400" />
                  <div className="overflow-hidden">
                    <div className="font-medium text-sm truncate">
                      {fileName}
                    </div>
                    <div className="text-xs opacity-70">Click to download</div>
                  </div>
                </a>
              )}
            </div>
          )}

          {text && (
            <div
              className={`p-3 rounded-lg ${
                isCurrentUser
                  ? darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-500 text-white"
                  : isAiMessage
                  ? darkMode
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-500 text-white"
                  : darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-white text-gray-800 border border-gray-200"
              }`}
            >
              <p className="whitespace-pre-wrap">{text}</p>
            </div>
          )}

          <div
            className={`text-xs ${
              darkMode ? "text-gray-400" : "text-gray-500"
            } ${isCurrentUser ? "text-right" : "text-left"} px-1`}
          >
            {time}
          </div>
        </div>
      </div>
    </div>
  );
}
