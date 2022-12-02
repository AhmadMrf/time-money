import { Routes, Route, Navigate } from "react-router-dom";
import DailyTab from "./daily-report/DailyTab";
import IncomesTab from "./incomes/IncomesTab";
import MonthlyTab from "./monthly-report/MonthlyTab";
import StartTab from "./start-time/StartTab";
import WeaklyTab from "./weakly-report/WeaklyTab";
export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/add-recordes" element={<StartTab />} />
      <Route path="/daily-recordes" element={<DailyTab />} />
      <Route path="/" element={<Navigate to="/daily-recordes" />} />
      <Route path="/weekly-recordes" element={<WeaklyTab />} />
      <Route path="/mouthly-recordes" element={<MonthlyTab />} />
      <Route path="/incomes" element={<IncomesTab />} />
      <Route path="*" element={<p>not found</p>} />
    </Routes>
  );
}
