import { addDoc, collection, getDocs } from "@firebase/firestore";
import { Timestamp } from "@firebase/firestore";
import { firestore, db } from "./firebase-config";
import { useRef, useState, useEffect } from "react";

const handleSubmit = (testdata) => {
  const ref = collection(firestore, "users"); // Firebase creates this automatically

  let data = {
    Name: testdata,
    createdAt: Timestamp.fromDate(new Date()),
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

  const refresh = async (e) => {
    const querySnapshot = await getDocs(collection(db, "collectionName"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log();
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await refresh();
      setData(fetchedData);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="App">
        <form className="m-4 flex space-x-4" onSubmit={submithandler}>
          <input
            type="text"
            placeholder="Name here"
            class="input input-bordered w-full max-w-xs"
            ref={dataRef}
          />
          <button className="btn btn-primary" type="submit">
            Save
          </button>
          <div>
            <button className="btn btn-primary">Refresh</button>
            <div>
              {data.filter((item) => (
                <div key={item.id}>
                  <h2>{item.Name}</h2>
                  <p>{item.createdAt}</p>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Other;
