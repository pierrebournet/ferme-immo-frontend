import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Building2, Users, MapPin, FileText, MessageSquare, BarChart3 } from 'lucide-react'
import './App.css'

// Composants
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Properties from './components/Properties'
import Leads from './components/Leads'
import Neighborhoods from './components/Neighborhoods'
import Reports from './components/Reports'
import Chatbot from './components/Chatbot'
import Login from './components/Login'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  if (!isAuthenticated) {
    return <Login onLogin={setIsAuthenticated} setUser={setUser} />
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} onLogout={() => setIsAuthenticated(false)} />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/proprietes" element={<Properties />} />
            <Route path="/prospects" element={<Leads />} />
            <Route path="/quartiers" element={<Neighborhoods />} />
            <Route path="/rapports" element={<Reports />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

