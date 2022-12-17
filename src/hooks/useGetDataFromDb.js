import { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";

const defaultData = { error: null, data: [] };
export const useGetDataFromDb = (table, fields = []) => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  const query = new Parse.Query(table);
  useEffect(() => {
    async function getData() {
      try {
        const data = await query.map((item) => {
          if (fields.length) {
            return fields.map((field) => {
              return { field: item.attributes[field] };
            });
          }
          return item.attributes;
        });
        setData({ error: null, data });
        setLoading(false);
      } catch (error) {
        setData({ error, data: null });
        setLoading(false);
      }
    }
    getData();
  }, []);
  return { ...data, loading };
};
