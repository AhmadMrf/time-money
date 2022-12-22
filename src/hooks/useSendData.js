import { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";

export default function useSendData(table, dataObj) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!["income", "records", "work_place", "User"].some((t) => t === table)) {
    setLoading(false);
    setError(true);
    throw new Error('invalid "Class" name');
  }

  const sendData = async () => {
    setLoading(true);
    const newObject = new Parse.Object(table);
    newObject.set(dataObj);

    try {
      const result = await newObject.save();
      setResult(result);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      setResult(null);
      console.log(error);
    }
  };

  return { sendData, loading, error, result };
}
