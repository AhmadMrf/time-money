import { useGlobalContext } from "../context/record-context";
import { monthes, years } from "../data/dates";
import ContentWrapper from "../templates/ContentWrapper";
import RowWrapper from "../templates/RowWrapper";
import SelectInput from "../templates/SelectInput";
import Total from "../templates/Total";
import Button from "../templates/Button";

import styles from "./MonthlyTab.module.css";

export default function MonthlyTab() {
  const {
    loading: { inMonthLoading },
    error: { inMonthError },
    inMonthObject,
    workPlaces,
    handleMonthTab,
  } = useGlobalContext();

  const totalRecords = inMonthObject.records?.reduce((total, record) => {
    const workPlace = workPlaces?.find(
      (item) => item.id === record.work_place.id
    );
    if (record.outOfDate) return total;
    let foundRecord = total.find((item) => item.id === record.work_place.id);
    if (!foundRecord) {
      const newTotalItem = {
        id: record.work_place.id,
        price: record.price,
        time: record.time,
        name: workPlace?.name || "no name",
      };
      return [...total, newTotalItem];
    }
    foundRecord.price += record.price;
    foundRecord.time += record.time;
    return total;
  }, []);
  const createTableCells = (field) => {
    return totalRecords?.map((record) => {
      if (field === "name") return <th key={record.id}>{record.name}</th>;
      return <td key={record.id}>{record[field]}</td>;
    });
  };
  const calcTotals = (field) => {
    return totalRecords?.reduce((total, record) => total + record[field], 0);
  };
  let noResult = null;
  if (!inMonthObject.records.length) {
    noResult = (
      <RowWrapper className={styles.month_wrapper}>
        <h4>{`${monthes[inMonthObject.month - 1]} - ${
          inMonthObject.year
        } `}</h4>
        <h4> اطلاعاتی ثبت نشده</h4>
      </RowWrapper>
    );
    if (inMonthError) {
      noResult = (
        <RowWrapper className={styles.center}>
          <h4> خطا در دریافت اطلاعات</h4>
          <Button
            className={styles.button}
            onClick={() => window.location.reload()}>
            دریافت مجدد اطلاعات
          </Button>
        </RowWrapper>
      );
    }
    if (inMonthLoading) {
      noResult = (
        <RowWrapper className={styles.center}>
          <h4> در حال دریافت اطلاعات</h4>
        </RowWrapper>
      );
    }
  }
  return (
    <ContentWrapper>
      {noResult || (
        <RowWrapper className={styles.month_wrapper}>
          <h3>{`${monthes[inMonthObject.month - 1]} - ${
            inMonthObject.year
          } `}</h3>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th></th>
                {createTableCells("name")}
                <th>کل</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              <tr>
                <td>زمان</td>
                {createTableCells("time")}
                <td>{calcTotals("time")}</td>
              </tr>
              <tr>
                <td>مبلغ</td>
                {createTableCells("price")}
                <td>{calcTotals("price")}</td>
              </tr>
            </tbody>
          </table>
        </RowWrapper>
      )}

      <Total className={styles.title}>
        <SelectInput
          disabled={inMonthError}
          onChange={(e) => handleMonthTab(e.target.value, "month")}
          value={inMonthObject.month}>
          {monthes.map((month, index) => (
            <option value={index + 1} key={index}>
              {month}
            </option>
          ))}
        </SelectInput>
        <SelectInput
          disabled={inMonthError}
          onChange={(e) => handleMonthTab(e.target.value, "year")}
          value={inMonthObject.year}>
          {years.map((year, index) => (
            <option value={year} key={index}>
              {year}
            </option>
          ))}
        </SelectInput>
      </Total>
    </ContentWrapper>
  );
}
