import React, { useRef } from "react";
import { firestore } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

function Home() {
  const messageRef = useRef();

  const ref = collection(firestore, "messages");

  const handleSave = async (e) => {
    e.preventDefault();

    const data = {
      message: messageRef.current.value,
    };

    try {
      await addDoc(ref, data);

      console.log("Message saved successfully!");

      messageRef.current.value = "";
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSave}>
        <label>Enter Message</label>
        <input type="text" ref={messageRef} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Home;