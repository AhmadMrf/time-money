// import "./styles.css";
import RecordProvider from "./context/record-context";
import IncomeProvider from "./context/income-conext";
import Navbar from "./navbar/Navbar";
import MyRoutes from "./MyRoutes";
import MainLayout from "./MainLayout";
// import Parse from "parse/dist/parse.min.js";
import "./config/parse-config";
export default function App() {
  return (
    <RecordProvider>
      <IncomeProvider>
        <MainLayout>
          <MyRoutes />
        </MainLayout>
      </IncomeProvider>
      <Navbar />
    </RecordProvider>
  );
}
