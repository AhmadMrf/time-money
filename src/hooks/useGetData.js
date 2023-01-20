import { useState, useEffect } from "react";

import Parse from "parse/dist/parse.min.js";

const useGetData = (table, ...fields) => {
  const [newData, setNewData] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getData = (newid) => {
    setNewData(newid);
  };
  const query = new Parse.Query(table);
  useEffect(() => {
    setLoading(true);
    async function getData() {
      try {
        // throw new Error("in month error");

        const data = await query.map((item) => {
          if (fields.length) {
            let newItem = {};
            fields.forEach((field) => {
              newItem[field] = item.attributes[field];
            });
            return { id: item.id, ...newItem };
          }
          return { id: item.id, ...item.attributes };
        });
        setData(data);
        setLoading(false);
      } catch (error) {
        setData([]);
        setLoading(false);
        setError(true);
        console.log(error);
      }
    }
    getData();
  }, [newData, table, ...fields]);
  return { getData, data, loading, error };
};

export default useGetData;
