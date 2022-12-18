import { useGlobalContext } from "../context/record-context";
import { monthes, years } from "../data/dates";
import ContentWrapper from "../templates/ContentWrapper";
import RowWrapper from "../templates/RowWrapper";
import SelectInput from "../templates/SelectInput";
import Total from "../templates/Total";
import styles from "./MonthlyTab.module.css";

export default function MonthlyTab() {
  const {
    loading: { inMonthLoading },
    error: { inMonthError },
    inMonthObject,
    workPlaces,
    handleMonthTab,
  } = useGlobalContext();
  const { records } = inMonthObject;
  const totalRecords = records.reduce((total, record) => {
    const { name } = workPlaces?.find(
      (item) => item.id === record.work_place.id
    );
    if (record.outOfDate) return total;
    let foundRecord = total.find((item) => item.id === record.work_place.id);
    if (!foundRecord) {
      const newTotalItem = {
        id: record.work_place.id,
        price: record.price,
        time: record.time,
        name,
      };
      return [...total, newTotalItem];
    }
    foundRecord.price += record.price;
    foundRecord.time += record.time;
    return total;
  }, []);
  const createTableCells = (field) => {
    return totalRecords.map((record) => {
      if (field === "name") return <th key={record.id}>{record.name}</th>;
      return <td key={record.id}>{record[field]}</td>;
    });
  };
  const calcTotals = (field) => {
    return totalRecords.reduce((total, record) => total + record[field], 0);
  };
  if (inMonthError) {
    return (
      <ContentWrapper>
        <RowWrapper className={styles.month_wrapper}>
          <h3> خطا در دریافت اطلاعات</h3>
        </RowWrapper>
      </ContentWrapper>
    );
  }
  if (inMonthLoading) {
    return (
      <ContentWrapper>
        <RowWrapper className={styles.month_wrapper}>
          <h3> در حال دریافت اطلاعات</h3>
        </RowWrapper>
        <Total className={styles.title}>
          <SelectInput
            onChange={(e) => handleMonthTab(e.target.value, "month")}
            value={inMonthObject.month}>
            {monthes.map((month, index) => (
              <option value={index + 1} key={index}>
                {month}
              </option>
            ))}
          </SelectInput>
          <SelectInput
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
  if (!inMonthObject.records.length) {
    return (
      <ContentWrapper>
        <RowWrapper className={styles.month_wrapper}>
          <h3>{`${monthes[inMonthObject.month - 1]} - ${
            inMonthObject.year
          } `}</h3>
          <h3> اطلاعاتی ثبت نشده</h3>
        </RowWrapper>
        <Total className={styles.title}>
          <SelectInput
            onChange={(e) => handleMonthTab(e.target.value, "month")}
            value={inMonthObject.month}>
            {monthes.map((month, index) => (
              <option value={index + 1} key={index}>
                {month}
              </option>
            ))}
          </SelectInput>
          <SelectInput
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
  return (
    <ContentWrapper>
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
      )
      <Total className={styles.title}>
        <SelectInput
          onChange={(e) => handleMonthTab(e.target.value, "month")}
          value={inMonthObject.month}>
          {monthes.map((month, index) => (
            <option value={index + 1} key={index}>
              {month}
            </option>
          ))}
        </SelectInput>
        <SelectInput
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
