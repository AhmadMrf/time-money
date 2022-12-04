// import "./styles.css";
import RecordProvider from "./context/record-context";
import Navbar from "./navbar/Navbar";
import MyRoutes from "./MyRoutes";
import MainLayout from "./MainLayout";
import "./api/parse-config";
import { useGetRecords } from "./hooks/useGetRecord";
export default function App() {
  const get = useGetRecords();
  console.log(get);
  return (
    <RecordProvider>
      <MainLayout>
        <MyRoutes />
      </MainLayout>
      <Navbar />
    </RecordProvider>
  );
}
