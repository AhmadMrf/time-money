// import "./styles.css";
import RecordProvider from "./context/record-context";
import Navbar from "./navbar/Navbar";
import MyRoutes from "./MyRoutes";
import MainLayout from "./MainLayout";
// import Parse from "parse/dist/parse.min.js";
import "./utils/parse-config";
// import { useGetDataFromB4E } from "./hooks/useGetDataFromB4E";
import { useGetInMonthRecords } from "./hooks/useGetInMonthRecords";

export default function App() {
  const { inMonthData } = useGetInMonthRecords(1401, 8);
  let { records } = inMonthData;
  console.log(records);
  return (
    <RecordProvider>
      <MainLayout>
        <MyRoutes />
      </MainLayout>
      <Navbar />
    </RecordProvider>
  );
}
