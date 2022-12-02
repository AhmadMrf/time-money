import { createContext } from "react";
export const Records = createContext(null);

const RECORDS = [
  {
    id: 1,
    w_p_id: 333,
    price: 300,
    time: 2,
    startTime: new Date(
      "Tue Nov 08 2022 13:26:00 GMT+0330 (Iran Standard Time)"
    ),
    description: "هتل"
  },
  {
    id: 2,
    w_p_id: 222,
    price: 200,
    time: 5,
    startTime: new Date(
      "Tue Nov 08 2022 12:26:00 GMT+0330 (Iran Standard Time)"
    ),
    description: "مطب"
  },
  {
    id: 3,
    w_p_id: 111,
    price: 100,
    time: 1,
    startTime: new Date(
      "Tue Nov 07 2022 19:26:00 GMT+0330 (Iran Standard Time)"
    ),
    description: "منزل"
  },
  {
    id: 4,
    w_p_id: 111,
    price: 500,
    time: 4,
    startTime: new Date(
      "Tue Nov 09 2022 08:00:00 GMT+0330 (Iran Standard Time)"
    ),
    description: "منزل"
  },
  {
    id: 5,
    w_p_id: 222,
    price: 600,
    time: 8,
    startTime: new Date(
      "Tue Nov 08 2022 22:26:00 GMT+0330 (Iran Standard Time)"
    ),
    description: "مطب"
  },
  {
    id: 6,
    w_p_id: 222,
    price: 50,
    time: 0.5,
    startTime: new Date(
      "Tue Nov 04 2022 10:26:00 GMT+0330 (Iran Standard Time)"
    ),
    description: "مطب"
  }
];

export default function RecordProvider({ children }) {
  return <Records.Provider value={RECORDS}>{children}</Records.Provider>;
}
