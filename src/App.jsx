// import "./styles.css";
import RecordProvider from "./context/record-context";
import Navbar from "./navbar/Navbar";
import MyRoutes from "./MyRoutes";
import MainLayout from "./MainLayout";
import "./api/parse-config";

export default function App() {
  return (
    <RecordProvider>
      <MainLayout>
        <MyRoutes />
      </MainLayout>
      <Navbar />
    </RecordProvider>
  );
}
