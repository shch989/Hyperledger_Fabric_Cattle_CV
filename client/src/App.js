import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Page
import CreateAdminWalletPage from './pages/CreateAdminWalletPage';
import CreateUserWalletPage from './pages/CreateUserWalletPage';
import QueryCattlePage from './pages/QueryCattlePage';
import QueryAllCattlePage from './pages/QueryAllCattlePage';
import CreateCattlePage from './pages/CreateCattlePage';
import CattleTreePage from './pages/CattleTreePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateAdminWalletPage />} />
        <Route path="/user-login" element={<CreateUserWalletPage />} />
        <Route path="/add-cattle" element={<CreateCattlePage />} />
        <Route path="/query-all-cattle" element={<QueryAllCattlePage />} />
        <Route path="/query-cattle" element={<QueryCattlePage />} />
        <Route path="/cattle-family-tree" element={<CattleTreePage />} />
      </Routes>
    </Router>
  )
}

export default App
