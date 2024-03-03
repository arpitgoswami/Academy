"use client";

import React, { useRef, useState, useEffect } from "react";
import { SiChatbot } from "react-icons/si";
import { BiSend } from "react-icons/bi";
import { FaGoogle } from "react-icons/fa";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

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

export default function Home() {
  const [name, setState] = useState("Chatting Application");
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="m-4 p-4 top-0 flex align-middle justify-between items-center bg-slate-950 rounded-xl">
        <div className="text-2xl space-x-2 font-semibold flex items-center">
          <div>
            <SiChatbot />
          </div>
          <div>Chitti</div>
        </div>
        <div>
          <SignOut />
        </div>
      </header>

      <section className="">{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <div className="mx-4 justify-center">
        <center>
          <img
            id="banner"
            src="./banner.png"
            style={{ width: "100%", height: "auto" }}
          />
          <div className="pt-4 text-3xl">Welcome Back!</div>
          <div className="py-4">
            Do not violate the community guidelines or you will be banned for
            life!
          </div>

          <button className="btn btn-primary" onClick={signInWithGoogle}>
            <FaGoogle /> Sign in with Google
          </button>
        </center>
      </div>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="btn btn-primary" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main className="p-4">
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form style={{ width: "100%" }} onSubmit={sendMessage}>
        <div
          style={{ width: "100%" }}
          className="p-4 fixed bottom-0 flex space-x-2 justify-center"
        >
          <div>
            <input
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="Type here"
              size="100"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div>
            <button
              className="btn btn-primary text-2xl"
              type="submit"
              disabled={!formValue}
            >
              <BiSend />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL, createdAt } = props.message;
  const [time, setTime] = useState();
  const [minus, setMinus] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    if (createdAt) {
      const newTime = createdAt.toDate().toLocaleDateString();
      setTime(newTime);

      const newTime2 = createdAt.toDate();
      const currentTime = new Date();
      const diffInMilliseconds = currentTime - newTime2;
      const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60)) + 1;
      const diffString =
        diffInMinutes === 0 ? "just now" : diffInMinutes + " minutes ago";
      setMinus(diffString);

      const newDay = createdAt
        .toDate()
        .toLocaleDateString(undefined, { weekday: "long" });

      setDay(newDay);
    }
  }, [createdAt]);

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
          className="w-8 rounded-xl"
        />
        <div className="message-box s">
          {text}
          <div className="timestamp">
            <div>{time}</div>
            <div>{minus}</div>
            <div>{day}</div>
          </div>
        </div>
      </div>
    </>
  );
}
