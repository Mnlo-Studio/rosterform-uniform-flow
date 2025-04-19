
import { createRoot } from 'react-dom/client'
import { LayoutProvider } from './context/LayoutContext'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <LayoutProvider>
    <App />
  </LayoutProvider>
);
