const getTimesForweek = (inMonthObject) => {
  const SECONDS_OF_DAY = 86400000;

  let dayCount = Math.round(
    (inMonthObject.endDate - inMonthObject.beginDate) / SECONDS_OF_DAY + 1
  );
  let weeks = [];
  let timeZoneDeff = 0;
  let startDate, endDate, endDateWithDiff, weeksObj;

  for (let i = 0, j = 0; i < dayCount; i += 7) {
    startDate = +inMonthObject.beginDate + i * SECONDS_OF_DAY;
    endDate = startDate + 7 * SECONDS_OF_DAY - 1;
    timeZoneDeff +=
      new Date(startDate).getTimezoneOffset() -
      new Date(endDate).getTimezoneOffset();
    endDateWithDiff = endDate + -timeZoneDeff * 60000;

    weeksObj = {
      id: ++j,
      startDate: startDate,
      endDate: endDateWithDiff,
    };

    weeks.push(weeksObj);
  }
  return weeks.reduce((seprated, week) => {
    let sepratedRecords = inMonthObject.records.filter((record) => {
      let recordTime = new Date(record.start_time).getTime();
      return (recordTime > week.startDate) & (recordTime < week.endDate);
    });

    let weekObj = {
      id: week.id,
      startDate: new Date(week.startDate),
      endDate: new Date(week.endDate),
      recordes: sepratedRecords,
    };
    seprated.push(weekObj);
    return seprated;
  }, []);
};

export { getTimesForweek };
