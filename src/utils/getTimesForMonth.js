import jalaali from "jalaali-js";

export function getTimesForMonth(jalaaliYearString, jalaaliMonthString) {
  const jalaaliYear = +jalaaliYearString;
  const jalaaliMonth = +jalaaliMonthString;
  let day = jalaali.jalaaliMonthLength(jalaaliYear, jalaaliMonth);
  let {
    gy: beginYear,
    gm: beginMonth,
    gd: beginDay,
  } = jalaali.toGregorian(jalaaliYear, jalaaliMonth, 1);
  let {
    gy: endYear,
    gm: endMonth,
    gd: endDay,
  } = jalaali.toGregorian(jalaaliYear, jalaaliMonth, day);

  let beginMonthDate = new Date(beginYear, beginMonth - 1, beginDay);
  let endMonthDate = new Date(endYear, endMonth - 1, endDay, 23, 59, 59, 999);
  let {
    saturday: { jy: firstYearFromDb, jm: firstMonthFromDb, jd: firstDayFromDb },
  } = jalaali.jalaaliWeek(jalaaliYear, jalaaliMonth, 1);
  let {
    friday: { jy: lastYearFromDb, jm: lastMonthFromDb, jd: lastDayFromDb },
  } = jalaali.jalaaliWeek(jalaaliYear, jalaaliMonth, day);

  let beginDate = jalaali.jalaaliToDateObject(
    firstYearFromDb,
    firstMonthFromDb,
    firstDayFromDb
  );
  let endDate = jalaali.jalaaliToDateObject(
    lastYearFromDb,
    lastMonthFromDb,
    lastDayFromDb,
    23,
    59,
    59,
    999
  );

  return {
    beginDate,
    endDate,
    beginMonthDate,
    endMonthDate,
  };
}

// beginDate => the saturday of week that the first day of month is inside it
// endDate => the friday of week that the last day of month is inside it
// beginMonthDate => the first day of month
// endMonthDate => the last day of month
