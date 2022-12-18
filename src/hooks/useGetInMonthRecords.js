import { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import { getTimesForMonth } from "../utils/getTimesForMonth";
const defaultRecords = {
  error: null,
  inMonthObject: {
    records: [],
    beginDate: null,
    endDate: null,
    month: 0,
    year: 1400,
  },
};
export function useGetInMonthRecords(jalaaliYear, jalaaliMonth) {
  const RECORD_TABLE = "records";
  const DATE_COLUMN = "start_time";
  const [records, setRecords] = useState(defaultRecords);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    async function getData() {
      const { beginMonthDate, endMonthDate, beginDate, endDate } =
        getTimesForMonth(jalaaliYear, jalaaliMonth);
      const beginMonthTime = beginMonthDate.getTime();
      const endMonthTime = endMonthDate.getTime();
      const query = new Parse.Query(RECORD_TABLE);
      query.greaterThanOrEqualTo(DATE_COLUMN, beginDate);
      query.lessThanOrEqualTo(DATE_COLUMN, endDate);

      try {
        const data = await query.map((item) => {
          let itemTime = new Date(item.attributes[DATE_COLUMN]).getTime();
          if (itemTime > beginMonthTime && itemTime < endMonthTime)
            return { ...item.attributes, outOfDate: false };
          return { ...item.attributes, outOfDate: true };
        });

        setRecords({
          error: null,
          inMonthObject: {
            beginDate,
            endDate,
            month: +jalaaliMonth,
            year: +jalaaliYear,
            records: data,
          },
        });
        setLoading(false);
      } catch (error) {
        setRecords({ error: error, inMonthObject: null });
        setLoading(false);
      }
    }
    getData();
  }, [jalaaliYear, jalaaliMonth]);
  return { ...records, loading };
}
