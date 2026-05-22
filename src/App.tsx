import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import AddBook from './pages/AddBook'
import EditBook from './pages/EditBook'
import Authors from './pages/Authors'
import AddAuthor from './pages/AddAuthor'
import { AuthProvider } from './context/AuthContext'
import { LibraryProvider } from './context/LibraryContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LibraryProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/add-book" element={<AddBook />} />
              <Route path="/edit-book/:id" element={<EditBook />} />
              <Route path="/add-author" element={<AddAuthor />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </LibraryProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
