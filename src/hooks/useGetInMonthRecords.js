import { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import jalaali from "jalaali-js";

export function useGetInMonthRecords(jalaaliYear, jalaaliMonth) {
  const RECORD_TABLE = "record";
  const DATE_COLUMN = "date";
  const [records, setRecords] = useState("");
  useEffect(() => {
    async function getData() {
      let day = jalaali.jalaaliMonthLength(jalaaliYear, jalaaliMonth);
      let {
        gy: bYear,
        gm: bMonth,
        gd: bDay,
      } = jalaali.toGregorian(jalaaliYear, jalaaliMonth, 1);
      let {
        gy: eYear,
        gm: eMonth,
        gd: eDay,
      } = jalaali.toGregorian(jalaaliYear, jalaaliMonth, day);

      let beginMonthTime = new Date(bYear, bMonth - 1, bDay).getTime();
      let endMonthTime = new Date(
        eYear,
        eMonth - 1,
        eDay,
        23,
        59,
        59,
        999
      ).getTime();

      let {
        saturday: {
          jy: firstYearFromDb,
          jm: firstMonthFromDb,
          jd: firstDayFromDb,
        },
      } = jalaali.jalaaliWeek(jalaaliYear, jalaaliMonth, 1);
      let {
        friday: { jy: lastYearFromDb, jm: lastMonthFromDb, jd: lastDayFromDb },
      } = jalaali.jalaaliWeek(jalaaliYear, jalaaliMonth, day);

      let startTime = jalaali.jalaaliToDateObject(
        firstYearFromDb,
        firstMonthFromDb,
        firstDayFromDb
      );
      let endTime = jalaali.jalaaliToDateObject(
        lastYearFromDb,
        lastMonthFromDb,
        lastDayFromDb,
        23,
        59,
        59,
        999
      );
      const query = new Parse.Query(RECORD_TABLE);
      query.greaterThanOrEqualTo(DATE_COLUMN, startTime);
      query.lessThanOrEqualTo(DATE_COLUMN, endTime);

      try {
        const data = await query.map((item) => {
          let d = new Date(item.attributes[DATE_COLUMN]).getTime();
          if (d > beginMonthTime && d < endMonthTime) return item.attributes;
          return { ...item.attributes, outOfDate: true };
        });

        setRecords({
          error: null,
          inMonthData: {
            startTime,
            endTime,
            records: data,
          },
        });
      } catch (error) {
        setRecords({ error: error, inMonthData: null });
      }
    }
    getData();
  }, [jalaaliYear, jalaaliMonth]);

  // let sortedResult = isAscending
  //   ? inMonthDate.sort((a, b) => new Date(a.date) - new Date(b.date))
  //   : inMonthDate.sort((b, a) => new Date(a.date) - new Date(b.date));

  return records;
}
