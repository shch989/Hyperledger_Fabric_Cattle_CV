import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Page
import CreateAdminWalletPage from './pages/CreateAdminWalletPage';
import CreateUserWalletPage from './pages/CreateUserWalletPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateAdminWalletPage />} />
        <Route path="/user-login" element={<CreateUserWalletPage />} />
      </Routes>
    </Router>
  )
}

export default App
