import { Navigate, Route, Routes } from 'react-router-dom';
import HelloPage from './pages/HelloPage.jsx';
import UIComponentsPage from './pages/UIComponentsPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HelloPage />} />
      <Route path="/ui-components" element={<UIComponentsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
