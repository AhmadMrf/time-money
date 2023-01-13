import { useState } from "react";
import Parse from "parse/dist/parse.min.js";

const useSendData = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendData = async (table, dataObj) => {
    setLoading(true);
    if (!["income", "records", "work_place", "User"].some((t) => t === table)) {
      setLoading(false);
      setError(true);
      throw new Error('invalid "Class" name');
    }
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
};

export default useSendData;
