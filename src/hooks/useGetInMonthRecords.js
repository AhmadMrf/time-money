import { useState, useEffect } from "react";

import Parse from "parse/dist/parse.min.js";
import jalaali from "jalaali-js";

import { getTimesForMonth } from "../utils/getTimesForMonth";

const now = new Date(Date.now());
const { jy: year } = jalaali.toJalaali(now);
const { jm: month } = jalaali.toJalaali(now);

const useGetInMonthRecords = (jalaaliYear = year, jalaaliMonth = month) => {
  const [newRecord, setNewRecord] = useState(""); // only for rerender hook
  const { beginMonthDate, endMonthDate, beginDate, endDate } = getTimesForMonth(
    jalaaliYear,
    jalaaliMonth
  );

  const defaultRecords = {
    inMonthObject: {
      records: [],
      beginDate,
      endDate,
      month,
      year,
    },
  };
  const RECORD_TABLE = "records";
  const DATE_COLUMN = "start_time";
  const [records, setRecords] = useState(defaultRecords);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getRecords = (newId) => {
    setNewRecord(newId);
  };
  useEffect(() => {
    setLoading(true);
    async function getData() {
      const beginMonthTime = beginMonthDate.getTime();
      const endMonthTime = endMonthDate.getTime();
      const query = new Parse.Query(RECORD_TABLE);
      query.greaterThanOrEqualTo(DATE_COLUMN, beginDate);
      query.lessThanOrEqualTo(DATE_COLUMN, endDate);

      try {
        // throw new Error("in month error");
        const data = await query.map((item) => {
          let itemTime = new Date(item.attributes[DATE_COLUMN]).getTime();
          if (itemTime > beginMonthTime && itemTime < endMonthTime)
            return { ...item.attributes, outOfDate: false };
          return { ...item.attributes, outOfDate: true };
        });

        setRecords({
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
        setRecords(defaultRecords);
        setLoading(false);
        setError(true);
        console.log(error);
      }
    }
    getData();
  }, [jalaaliYear, jalaaliMonth, newRecord]);
  return { ...records, loading, error, getRecords };
};

export default useGetInMonthRecords;
