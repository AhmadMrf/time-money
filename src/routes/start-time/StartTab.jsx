import { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import ContentWrapper from "../../templates/ContentWrapper";
import RowWrapper from "../../templates/RowWrapper";
import TimeCard from "./TimeCard";
import CompletedTimeCard from "./CompletedTimeCard";
import Modal from "../../components/modal/Modal";
import styles from "./StartTab.module.css";
import FooterStartTab from "./FooterStartTab";

const StartTab = () => {
  const [_, setLocalStorage] = useState();
  const { getLocalData } = useLocalStorage();
  const records = getLocalData("record");
  let noResult = null;
  if (!records.length) {
    noResult = (
      <RowWrapper className={styles.no_result}>
        هنوز کاری را شروع نکرده اید.
      </RowWrapper>
    );
  }
  let timeCards = records.map((record) => {
    if (record.end_time)
      return (
        <CompletedTimeCard
          setLocalStorage={setLocalStorage}
          key={record.start_time}
          {...record}
        />
      );
    return (
      <TimeCard
        setLocalStorage={setLocalStorage}
        key={record.start_time}
        {...record}
      />
    );
  });
  return (
    <ContentWrapper>
      <Modal>
        <div>start modal</div>
      </Modal>
      {noResult || <RowWrapper>{timeCards}</RowWrapper>}
      <FooterStartTab setLocalStorage={setLocalStorage} />
    </ContentWrapper>
  );
};
export default StartTab;
