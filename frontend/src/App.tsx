import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Frontpage from './components/Frontpage/Frontpage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';


const App: React.FC = () => (
  <>
    <style>
      {`
        body {
          margin: 0;
          height: 100%;
        }
      `}
    </style>
    <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/frontpage"
              element={
                <ProtectedRoute>
                  <Frontpage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
        <Footer />
  </>
);

export default App;