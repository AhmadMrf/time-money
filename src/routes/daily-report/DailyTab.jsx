import { useGlobalContext } from "../context/record-context";
import { mergeDayRecords } from "../utils/mergeDayRecords";
import ContentWrapper from "../templates/ContentWrapper";
import RowWrapper from "../templates/RowWrapper";
import TotalDaily from "./TotalDaily";
import DailyRow from "./DailyRow";
import styles from "./DailyTab.module.css";

const DailyTab = () => {
  const { inMonthObject, loading, error } = useGlobalContext();
  const daysRecords = mergeDayRecords(inMonthObject);
  const activeDays = Object.keys(daysRecords);
  return (
    <ContentWrapper>
      <RowWrapper>
        <DailyRow title='منزل'></DailyRow>
        <DailyRow title='مطب'></DailyRow>
      </RowWrapper>
      <TotalDaily totalTime={4} totalPrice={200} activeDays={activeDays} />
    </ContentWrapper>
  );
};
export default DailyTab;
