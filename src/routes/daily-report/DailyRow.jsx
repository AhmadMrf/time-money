import Card from "../../templates/Card";
import styles from "./DailyRow.module.css";
const DailyRow = ({ title, className, records }) => {
  const dailyRows = records.map((dailyRow) => {
    const startTime = new Intl.DateTimeFormat("fa-ir", {
      timeStyle: "short",
    }).format(dailyRow.start_time);
    const endTime = new Intl.DateTimeFormat("fa-ir", {
      timeStyle: "short",
    }).format(
      new Date(dailyRow.start_time.getTime() + dailyRow.time * 3600000)
    );
    return (
      <tr key={dailyRow.start_time.getTime()}>
        <td>{startTime}</td>
        <td>{endTime}</td>
        <td>{dailyRow.time}</td>
        <td>{dailyRow.description}</td>
        <td>{dailyRow.price}</td>
      </tr>
    );
  });
  return (
    <div className={`${styles.total} ${className || ""}`}>
      <Card title={title}>
        <table className={styles.table}>
          <tbody>{dailyRows}</tbody>
        </table>
      </Card>
    </div>
  );
};
export default DailyRow;
