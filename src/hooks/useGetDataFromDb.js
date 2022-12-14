import { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";

const defaultInfo = { error: null, info: [] };
export const useGetDataFromDb = (table, fields = []) => {
  const [info, setInfo] = useState(defaultInfo);
  const query = new Parse.Query(table);
  useEffect(() => {
    async function getData() {
      try {
        const info = await query.map((item) => {
          if (fields.length) {
            return fields.map((field) => {
              return { field: item.attributes[field] };
            });
          }
          return item.attributes;
        });
        setInfo({ error: null, info });
      } catch (error) {
        setInfo({ error, info: null });
      }
    }
    getData();
  }, []);
  return info;
};
