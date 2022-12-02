import ContentWrapper from "../templates/ContentWrapper";
import RowWrapper from "../templates/RowWrapper";
import styles from "./DailyTab.module.css";
import TotalDaily from "./TotalDaily";
import DailyRow from "./DailyRow";
export default function DailyTab({ children, className, ...rest }) {
  return (
    <ContentWrapper>
      <RowWrapper>
        <DailyRow title="منزل"></DailyRow>
        <DailyRow title="مطب"></DailyRow>
      </RowWrapper>
      <TotalDaily />
    </ContentWrapper>
  );
}
