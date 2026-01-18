import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Acceuil from './pages/acceuil/acceuil.jsx'
import Inscription from "./pages/inscription/Inscription.jsx"
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="/inscription" element={<Inscription />} />
      </Routes>
    </Router>
  )
}

export default App