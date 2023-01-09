import Button from "../../templates/Button";
import ContentWrapper from "../../templates/ContentWrapper";
import RowWrapper from "../../templates/RowWrapper";
import TimeCard from "./TimeCard";
import CompletedTimeCard from "./CompletedTimeCard";
import Modal from "../../components/modal/Modal";
import styles from "./StartTab.module.css";
import FooterStartTab from "./FooterStartTab";

const RECORDES = [
  {
    id: 1,
    place: "مطب",
    startTime: new Date("2022-12-02T16:50:12"),
    endTime: null,
    completed: false,
    price: 0,
    description: "",
  },
  {
    id: 2,
    place: "منزل",
    startTime: new Date("2022-12-02T09:12:12"),
    endTime: null,
    completed: false,
    price: 0,
    description: "",
  },
  {
    id: 3,
    place: "مطب",
    startTime: new Date("2022-12-02T12:55:12"),
    endTime: new Date("2022-12-03T13:10:10"),
    completed: true,
    price: 200,
    description: "د . ملکی",
  },
];
const StartTab = () => {
  let timeCards = RECORDES.map((record) => {
    if (record.completed)
      return <CompletedTimeCard key={record.id} {...record} />;
    return <TimeCard key={record.id} {...record} />;
  });
  return (
    <ContentWrapper>
      <Modal>
        <div>start modal</div>
      </Modal>
      <RowWrapper>{timeCards}</RowWrapper>
      <FooterStartTab />
    </ContentWrapper>
  );
};
export default StartTab;
