import { Routes, Route, Navigate } from "react-router-dom";

import DailyTab from "../routes/daily-report/DailyTab";
import IncomesTab from "../routes/incomes/IncomesTab";
import MonthlyTab from "../routes/monthly-report/MonthlyTab";
import StartTab from "../routes/start-time/StartTab";
import WeaklyTab from "../routes/weakly-report/WeaklyTab";
const MyRoutes = () => {
  return (
    <Routes>
      <Route path='/add-recordes' element={<StartTab />} />
      <Route path='/daily-recordes' element={<DailyTab />} />
      <Route path='/' element={<Navigate to='/mouthly-recordes' />} />
      <Route path='/weekly-recordes' element={<WeaklyTab />} />
      <Route path='/mouthly-recordes' element={<MonthlyTab />} />
      <Route path='/incomes' element={<IncomesTab />} />
      <Route path='*' element={<p>not found</p>} />
    </Routes>
  );
};
export default MyRoutes;
