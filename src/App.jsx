// import "./styles.css";
import RecordProvider from "./context/record-context";
import Navbar from "./components/navbar/Navbar";
import MyRoutes from "./components/MyRoutes";
import MainLayout from "./components/main/MainLayout";
import "./config/parse-config";
const App = () => {
  return (
    <RecordProvider>
      <MainLayout>
        <MyRoutes />
      </MainLayout>
      <Navbar />
    </RecordProvider>
  );
};
export default App;
