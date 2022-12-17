import { useState } from "react";
import { useIncomeContext } from "../context/income-conext";
import RowWrapper from "../templates/RowWrapper";
import ContentWrapper from "../templates/ContentWrapper";
import IncomeRow from "./IncomeRow";
import styles from "./IncomesTab.module.css";
import TotalIncomes from "./TotalIncomes";
const INCOMES = [
  {
    id: 1,
    w_p_id: 1,
    description: "مطب",
    income_date: new Date(
      "Tue Nov 08 2022 12:26:00 GMT+0330 (Iran Standard Time)"
    ),
    price: 100,
  },
  {
    id: 2,
    w_p_id: 1,
    description: "مطب",
    income_date: new Date(
      "Tue Nov 06 2022 12:26:00 GMT+0330 (Iran Standard Time)"
    ),
    price: 500,
  },
  {
    id: 3,
    w_p_id: 4,
    description: "هتل",
    income_date: new Date(
      "Tue Nov 07 2022 12:26:00 GMT+0330 (Iran Standard Time)"
    ),
    price: 250,
  },
  {
    id: 4,
    w_p_id: 1,
    description: "مطب",
    income_date: new Date(
      "Tue Nov 07 2022 12:26:00 GMT+0330 (Iran Standard Time)"
    ),
    price: 120,
  },
  {
    id: 5,
    w_p_id: 1,
    description: "مطب",
    income_date: new Date(
      "Tue Nov 07 2022 12:26:00 GMT+0330 (Iran Standard Time)"
    ),
    price: 120,
  },
  {
    id: 6,
    w_p_id: 1,
    description: "مطب",
    income_date: new Date(
      "Tue Nov 07 2022 12:26:00 GMT+0330 (Iran Standard Time)"
    ),
    price: 120,
  },
  {
    id: 11,
    w_p_id: 1,
    description: "مطب",
    income_date: new Date(
      "Tue Nov 08 2022 12:26:00 GMT+0330 (Iran Standard Time)"
    ),
    price: 100,
  },
  {
    id: 12,
    w_p_id: 1,
    description: "مطب",
    income_date: new Date(
      "Tue Nov 06 2022 12:26:00 GMT+0330 (Iran Standard Time)"
    ),
    price: 500,
  },
  {
    id: 13,
    w_p_id: 2,
    description: "منزل",
    income_date: new Date(
      "Tue Nov 07 2022 12:26:00 GMT+0330 (Iran Standard Time)"
    ),
    price: 350,
  },
  {
    id: 14,
    w_p_id: 1,
    description: "مطب",
    income_date: new Date(
      "Tue Nov 07 2022 12:26:00 GMT+0330 (Iran Standard Time)"
    ),
    price: 120,
  },
  {
    id: 15,
    w_p_id: 1,
    description: "مطب",
    income_date: new Date(
      "Tue Nov 07 2022 12:26:00 GMT+0330 (Iran Standard Time)"
    ),
    price: 120,
  },
  {
    id: 16,
    w_p_id: 3,
    description: "اسنپ",
    income_date: new Date(
      "Tue Nov 07 2022 12:26:00 GMT+0330 (Iran Standard Time)"
    ),
    price: 120,
  },
];

export default function IncomesTab() {
  const [selectedId, setSelectedId] = useState(1);
  const { incomes, loading, error } = useIncomeContext();
  // console.log(data);
  const workPlaces = () => {
    return INCOMES.reduce((filteredIncome, income) => {
      let foundIncome = filteredIncome.find(
        (item) => item.id === income.w_p_id
      );
      if (foundIncome) return filteredIncome;
      return [
        ...filteredIncome,
        { id: income.w_p_id, name: income.description },
      ];
    }, []);
  };
  const selectedPrice = (selectedWorkPlaceId) => {
    return INCOMES.filter(
      (income) => income.w_p_id === +selectedWorkPlaceId
    ).reduce((total, { price }) => total + price, 0);
  };
  const totalPrice = INCOMES.reduce((total, { price }) => total + price, 0);
  const onSelectedPrice = (id) => {
    setSelectedId(id);
  };
  if (error) {
    return (
      <ContentWrapper>
        <RowWrapper className={styles.center}>
          <h3>خطا در دریافت اطلاعات</h3>
        </RowWrapper>
      </ContentWrapper>
    );
  }
  if (loading) {
    return (
      <ContentWrapper>
        <RowWrapper className={styles.center}>
          <h3>خطا در دریافت اطلاعات</h3>
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
        {INCOMES.map((income) => (
          <IncomeRow
            key={income.id}
            id={income.id}
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
          total={totalPrice}
          workPlaces={workPlaces()}
        />
      </div>
    </ContentWrapper>
  );
}
