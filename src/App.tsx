import { Route, Routes } from 'react-router-dom';
import HomeList from './pages/HomeList.tsx';
import HomeAdd from './pages/HomeAdd.tsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeList />} />
      <Route path="/add" element={<HomeAdd />} />
    </Routes>
  );
}
