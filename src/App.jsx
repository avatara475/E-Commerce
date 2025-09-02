import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import './App.css'
import LoginPage from './components/auth/LoginPage'
import SignupPage from './components/auth/SignupPage'
import HomePage from './components/home/HomePage'
import Navbar from './components/Navbar'
import Fotter from './components/Fotter'
import { AuthProvider, useAuth } from './components/contexts/authContext'
import ProtectedRoute from './components/protected/ProtectedRoute'
import PublicRoute from './components/protected/PublicRoute'
import FooterNav from './components/FooterNav'

function Layout() {
  const location = useLocation();
  const { user } = useAuth();

  // Define routes where Navbar & Footer should not be shown
  const hideLayout = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path='/login' element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />
        <Route path='/signup' element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        } />
        {/* Catch all route - redirect to home if authenticated, else to login */}
        <Route path='*' element={user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />} />
      </Routes>
      {!hideLayout && <Fotter />}
      {!hideLayout && <FooterNav />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}


export default App;
