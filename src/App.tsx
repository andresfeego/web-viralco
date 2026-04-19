import { Route, Routes } from 'react-router-dom';
import HomeList from './pages/HomeList.tsx';
import HomeAdd from './pages/HomeAdd.tsx';
import DesignSystemPage from './pages/DesignSystemPage.tsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeList />} />
      <Route path="/add" element={<HomeAdd />} />
      <Route path="/ui-components" element={<DesignSystemPage />} />
      <Route path="/design-system" element={<DesignSystemPage />} />
    </Routes>
  );
}
