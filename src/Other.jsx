import { addDoc, collection } from "@firebase/firestore";
import { firestore } from "./firebase-config";
import { useRef } from "react";

const handleSubmit = (testdata) => {
  const ref = collection(firestore, "users"); // Firebase creates this automatically

  let data = {
    Name: testdata,
  };

  try {
    addDoc(ref, data);
  } catch (err) {
    console.log(err);
  }
};

function Other() {
  const dataRef = useRef();

  const submithandler = (e) => {
    e.preventDefault();
    handleSubmit(dataRef.current.value);
    dataRef.current.value = "";
  };

  return (
    <div className="App">
      <form onSubmit={submithandler}>
        <input type="text" ref={dataRef} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Other;
