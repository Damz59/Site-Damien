import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "./Components/Header.jsx"
import Body from "./Components/Body.jsx"
import Footer from "./Components/Footer.jsx"
import Inscription from "./pages/inscription/Inscription.jsx"
import Connexion from "./pages/connexion/Connexion.jsx"
import Projets from "./pages/projets/Projets.jsx"
import CVCompetences from "./pages/cvcompetences/CVCompetences.jsx"
import Contact from "./pages/contact/Contact.jsx"
import * as React from "react"
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="/cv-competences" element={<CVCompetences />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer /> 
      </div>
    </BrowserRouter>
  )
}

export default App