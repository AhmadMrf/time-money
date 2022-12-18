import { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";

const defaultData = { error: null, data: [] };
export const useGetDataFromDb = (table, ...fields) => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  const query = new Parse.Query(table);
  useEffect(() => {
    setLoading(true);
    async function getData() {
      try {
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
        setData({ error: null, data });
        setLoading(false);
      } catch (error) {
        setData({ error, data: null });
        setLoading(false);
      }
    }
    getData();
  }, [table, ...fields]);
  return { ...data, loading };
};
