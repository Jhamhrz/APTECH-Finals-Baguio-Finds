import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BaguioFinds from './BaguioFinds'
import ProductDetail from './ProductDetail'

function App() {
  return (
    <BrowserRouter basename="/APTECH-Finals-Baguio-Finds">
      <Routes>
        <Route path="/" element={<BaguioFinds />} />
        <Route path="/product/:productSlug" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App