import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/record-context";
import RowWrapper from "../templates/RowWrapper";
import ContentWrapper from "../templates/ContentWrapper";
import IncomeRow from "./IncomeRow";
import styles from "./IncomesTab.module.css";
import TotalIncomes from "./TotalIncomes";

export default function IncomesTab() {
  const {
    incomes,
    workPlaces,
    loading: { incomeLoading, workPlaceLoading },
    error: { incomeError },
  } = useGlobalContext();

  const [selectedId, setSelectedId] = useState(undefined);
  useEffect(() => {
    if (!workPlaceLoading) setSelectedId(workPlaces[0].id);
  }, [workPlaceLoading]);
  const selectedPrice = (selectedWorkPlaceId) => {
    return incomes
      .filter((income) => income.w_p_id.id === selectedWorkPlaceId)
      .reduce((total, { price }) => total + price, 0);
  };
  const totalPrice = incomes.reduce((total, { price }) => total + price, 0);
  const onSelectedPrice = (id) => {
    setSelectedId(id);
  };
  if (incomeError) {
    return (
      <ContentWrapper>
        <RowWrapper className={styles.center}>
          <h3>خطا در دریافت اطلاعات</h3>
        </RowWrapper>
      </ContentWrapper>
    );
  }
  if (incomeLoading) {
    return (
      <ContentWrapper>
        <RowWrapper className={styles.center}>
          <h3> درحال دریافت اطلاعات</h3>
        </RowWrapper>
      </ContentWrapper>
    );
  }
  return (
    <ContentWrapper>
      <RowWrapper>
        <IncomeRow
          id={"شماره"}
          description={"توضیحات"}
          incomeDate={"تاریخ"}
          price={"مبلغ"}
        />
        {incomes.map((income, index) => (
          <IncomeRow
            key={income.id}
            id={++index}
            description={income.description}
            incomeDate={income.income_date}
            price={income.price}
          />
        ))}
      </RowWrapper>
      <div className={styles.bottom_section}>
        <TotalIncomes
          onSelect={onSelectedPrice}
          selected={selectedPrice(selectedId)}
          selectedId={selectedId}
          total={totalPrice}
          workPlaces={workPlaces}
        />
      </div>
    </ContentWrapper>
  );
}
