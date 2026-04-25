import { Route, Routes } from 'react-router-dom';
import HelloPage from './pages/HelloPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HelloPage />} />
    </Routes>
  );
}
