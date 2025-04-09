import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './components/Login/Login';
import Frontpage from './components/Frontpage/Frontpage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { ConfigProvider } from 'antd';
import getCustomTheme from './theme/mainTheme';
import './App.css';
import UserProfile from './components/UserProfile/UserProfile';
import Layout from './components/Layout/Layout';
import AboutMe from './components/AboutMe/AboutMe';
import { useState } from 'react';
import { AuthProvider }  from './components/Auth/AuthContext';
import Home from './components/Home/Home';
import messages from './locales/index';
import { IntlProvider } from 'react-intl';
import './theme/setCSSVars.ts'



const queryClient = new QueryClient();

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const customTheme = getCustomTheme(isDarkMode);
  const [locale, setLocale] = useState('es');

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={customTheme}>
          <BrowserRouter>
            <Routes>
              {/* Public Route */}
              <Route path="login" element={<Login />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                    <Layout isDarkMode={isDarkMode}
                            setIsDarkMode={setIsDarkMode}
                            locale={locale}
                            setLocale={setLocale}
                            />
                }
              >
                <Route index element={<Home />} /> {/* Main page */}
                <Route path="frontpage" element={<Frontpage />} /> {/* Frontpage */}
                <Route path="about" element={<AboutMe isDarkMode={isDarkMode} />} /> {/* About */}
                <Route path="user/:id" element={<UserProfile />} /> {/* User Profile */}
              </Route>

              {/* Redirect unknown routes */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </QueryClientProvider>
    </AuthProvider>
    </IntlProvider>
  );
};

export default App;