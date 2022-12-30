import { mergeDayRecords } from "../utils/mergeDayRecords";
import ContentWrapper from "../templates/ContentWrapper";
import RowWrapper from "../templates/RowWrapper";
import styles from "./DailyTab.module.css";
import TotalDaily from "./TotalDaily";
import DailyRow from "./DailyRow";
import { useGlobalContext } from "../context/record-context";
const DailyTab = ({ children, className, ...rest }) => {
  const { inMonthObject, loading, error } = useGlobalContext();
  const daysRecords = mergeDayRecords(inMonthObject);
  const activeDays = Object.keys(daysRecords);
  return (
    <ContentWrapper>
      <RowWrapper>
        <DailyRow title="منزل"></DailyRow>
        <DailyRow title="مطب"></DailyRow>
      </RowWrapper>
      <TotalDaily totalTime={4} totalPrice={200} activeDays={activeDays} />
    </ContentWrapper>
  );
};
export default DailyTab;
