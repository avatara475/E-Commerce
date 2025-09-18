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
import SelectedProductPage from './components/SelectProduct/SelectedProductPage'
import MainCategory from './components/Category/pages'
import AddtocartPage from './components/AddToCart/page/AddtocartPage'
import WishlistPage from './components/Wishlist/page/WishlistPage'
import { useEffect } from 'react'
import { Provider } from 'react-redux'  
import store from './store'
import ProfilePage from './components/profile'


function Layout() {
  const location = useLocation();
  const { user } = useAuth();

  // Define routes where Navbar & Footer should not be shown
  const hideLayout = ["/login", "/signup"].includes(location.pathname);

  useEffect(()=>{
    window.scrollTo({ top: 0, left: 0 });
  })

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/product/:id" element={
          <ProtectedRoute>
          <SelectedProductPage />
          </ProtectedRoute>
          } />
          <Route path="/category" element={
          <ProtectedRoute>
          <MainCategory />
          </ProtectedRoute>
          } />
          <Route path="/category/:categoryName" element={
          <ProtectedRoute>
          <MainCategory />
          </ProtectedRoute>
          } />
          <Route path="/wishlist" element={
          <ProtectedRoute>
          <WishlistPage/>
          </ProtectedRoute>
          } />
          <Route path="/cart" element={
          <ProtectedRoute>
          <AddtocartPage />
          </ProtectedRoute>
          } />
          <Route path="/account" element={
          <ProtectedRoute>
          <ProfilePage />
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
    <Provider store={store}>
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
    </Provider>
  );
}


export default App;
