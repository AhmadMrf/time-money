import ContentWrapper from "../../templates/ContentWrapper";
import RowWrapper from "../../templates/RowWrapper";
import TotalDaily from "./TotalDaily";
import DailyRow from "./DailyRow";
import styles from "./DailyTab.module.css";

const DailyTab = ({ children, className, ...rest }) => {
  return (
    <ContentWrapper>
      <RowWrapper>
        <DailyRow title='منزل'></DailyRow>
        <DailyRow title='مطب'></DailyRow>
      </RowWrapper>
      <TotalDaily />
    </ContentWrapper>
  );
};
export default DailyTab;
