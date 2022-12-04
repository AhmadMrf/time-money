import { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
export function useGetRecords(date) {
  const [records, setRecords] = useState({});
  useEffect(() => {
    const getRecords = async () => {
      const query = new Parse.Query("record");
      try {
        const data = await query.find();
        setRecords({ error: null, records: data });
      } catch (error) {
        setRecords({ error: error, records: null });
      }
    };
    getRecords();
  }, []);
  return records;
}
