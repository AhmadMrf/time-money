import { weekDays } from "../data/dates";
const mergeWeekRecords = (sepratedWeekObject) => {
  if (!sepratedWeekObject) return null;
  const { recordes, startDate, endDate } = sepratedWeekObject;

  const totalRecords = recordes?.reduce((total, item) => {
    const foundindex = total?.findIndex(
      (founditem) =>
        founditem.start_time.getDate() === item.start_time.getDate()
    );
    if (foundindex >= 0) {
      total[foundindex].price += item.price;
      total[foundindex].time += item.time;
      return [...total];
    } else {
      return [...total, { ...item }];
    }
  }, []);
  const SECONDS_OF_DAY = 86400000;
  const EXTRA_6_HOURS = 21600000;
  const mergedRecords = Array.from({ length: 7 }, (_, i) => {
    const date = startDate.getTime() + EXTRA_6_HOURS + SECONDS_OF_DAY * i;
    const record = totalRecords.find(
      (item) =>
        item.start_time.toLocaleDateString("fa-ir", { weekday: "long" }) ===
        weekDays[i]
    );
    return {
      date: new Date(date),
      record,
    };
  });
  return mergedRecords;
};
export default mergeWeekRecords;
