import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { LanguageProvider } from "@/context/languageContext"
import { ThemeProvider } from "@/context/themeContext"
import ClickSpark from '@/component/reactbit/clickSpark';
import { NotificationProvider } from "@/context/notificationContext"
import { ModalProvider } from "@/context/modalContext"
import { LoadingProvider } from "@/context/loadingContext"
import { PerformanceProvider } from "@/context/performanceContext"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PerformanceProvider>
        <NotificationProvider>
          <LanguageProvider>
            <LoadingProvider>
              <ThemeProvider>
                <ModalProvider>
                  <ClickSpark>
                     <App />
                  </ClickSpark>
                </ModalProvider>
              </ThemeProvider>
            </LoadingProvider>
          </LanguageProvider>
        </NotificationProvider>
      </PerformanceProvider>
    </BrowserRouter>
  </StrictMode>
)
