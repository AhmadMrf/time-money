import { toJalaali } from "jalaali-js";

const mergeDayRecords = (inMonthObject) => {
  const sepratedByDay = inMonthObject?.records?.reduce((total, record) => {
    const { jd: day } = toJalaali(record.start_time);
    if (total[day]) {
      total[day].push(record);
    } else {
      total[day] = [record];
    }
    return total;
  }, {});
  return sepratedByDay;
};
export { mergeDayRecords };
