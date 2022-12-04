import { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
export function useGetDataFromB4E(tableNameOrqueries) {
  const [records, setRecords] = useState({});
  useEffect(() => {
    const getRecords = async () => {
      let query = undefined;
      if (typeof tableNameOrqueries === "string") {
        query = new Parse.Query(tableNameOrqueries);
      } else {
        query = tableNameOrqueries;
      }
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
