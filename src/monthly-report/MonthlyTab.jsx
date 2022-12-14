import { useContext } from "react";
import { recordsData } from "../context/record-context";
import { useGetDataFromDb } from "../hooks/useGetDataFromDb";
import ContentWrapper from "../templates/ContentWrapper";
import RowWrapper from "../templates/RowWrapper";
import SelectInput from "../templates/SelectInput";
import Total from "../templates/Total";
import styles from "./MonthlyTab.module.css";

export default function MonthlyTab() {
  const info = useGetDataFromDb("work_place", ["name"]);
  // console.log(info);
  const { error, inMonthObject } = useContext(recordsData);
  const { records } = inMonthObject;
  console.log(error, records);
  const totalRecords = records.reduce((total, record) => {
    let foundRecord = total.find((item) => item.id === record.work_place.id);
    if (!foundRecord) {
      const newTotalItem = {
        id: record.work_place.id,
        price: record.price,
        time: record.time,
        name: record.description,
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
  if (error) {
    return (
      <ContentWrapper>
        <RowWrapper className={styles.month_wrapper}>
          <h3> خطا در دریافت اطلاعات</h3>
        </RowWrapper>
      </ContentWrapper>
    );
  }
  return (
    <ContentWrapper>
      <RowWrapper className={styles.month_wrapper}>
        <h3>{`${inMonthObject.month} ${inMonthObject.year} `}</h3>
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
      <Total className={styles.title}>
        <SelectInput>
          <option value='0'>بهار</option>
          <option value='1'>تابستان</option>
          <option value='2'>پاییز</option>
          <option value='3'>زمستان</option>
        </SelectInput>
        <SelectInput>
          <option value='1400'>1400</option>
          <option value='1401'>1401</option>
        </SelectInput>
      </Total>
    </ContentWrapper>
  );
}
