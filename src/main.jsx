import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/AppRoutes'
import { ProductProvider } from './contexts/ProductContext'

createRoot(document.getElementById('root')).render(
  <ProductProvider>           
      <AppRoutes />
  </ProductProvider>
)
