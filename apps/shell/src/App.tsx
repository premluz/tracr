import { Routes, Route, Navigate } from "react-router"
import { PolishedInventoryPage } from "./pages/inventory/polished"

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/inventory/polished" replace />} />
      <Route path="/inventory/polished" element={<PolishedInventoryPage />} />
    </Routes>
  )
}
