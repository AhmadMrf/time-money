import Card from "../../templates/Card";
import styles from "./DailyRow.module.css";
const DailyRow = ({ title, className, dailyRecords }) => {
  return (
    <div className={`${styles.total} ${className || ""}`}>
      <Card title={title}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td>11:45</td>
              <td>15:45</td>
              <td>اونجا</td>
              <td>500</td>
            </tr>

            <tr>
              <td>11:45</td>
              <td>15:45</td>
              <td>اون تبل تیبتل جا</td>
              <td>200</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};
export default DailyRow;
