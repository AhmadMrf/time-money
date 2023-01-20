import { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";

const useSendData = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setResult(null);
  }, [result]);
  const sendData = async (table, dataObj) => {
    setResult(null);
    setError(false);
    setLoading(true);
    if (!["income", "records", "work_place", "User"].some((t) => t === table)) {
      setLoading(false);
      setError(true);
      throw new Error('invalid "Class" name');
    }
    const newObject = new Parse.Object(table);
    newObject.set(dataObj);

    try {
      // throw new Error("send data error");
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
};

export default useSendData;
