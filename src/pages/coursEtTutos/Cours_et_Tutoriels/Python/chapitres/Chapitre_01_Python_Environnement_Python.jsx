
// Chapitre_01_Python_Environnement_Python.jsx

import React from "react";
import { Link } from "react-router-dom";
import "./Chapitre_Python.css";

export default function Chapitre_01_Python_Environnement_Python() {
    return (
        <main className="flex-grow-1 overflow-auto page-content">
        <header className="chapter-header">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
                <h1 className="chapter-title">
                Chapitre 1 — Installer ton environnement Python
                </h1>
                <p className="chapter-subtitle mb-0">
                Installer les outils de base pour suivre le cours et faire les exercices.
                </p>
            </div>
            </div>
        </header>

        <section className="chapter-card">
            <div className="chapter-section">
            <h2 className="section-title">Installer Visual Studio Code (VS Code)</h2>

            <h3>A&#41; Pourquoi VS Code ?</h3>
            <p>
                VS Code sera ton environnement de travail principal (édition, exécution,
                extensions, débogage).
            </p>

            <h3>B&#41; Installation</h3>
            <ul className="clean-list">
                <li>
                Télécharger :{" "}
                <a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">
                    https://code.visualstudio.com/
                </a>
                </li>
                <li>
                Installer :
                <ul className="clean-list">
                    <li>
                    <strong>Windows</strong> : lance l’installateur (.exe) puis clique sur{" "}
                    <em>Suivant</em> en gardant les options par défaut (tu peux cocher le
                    raccourci bureau si tu veux).
                    </li>
                    <li>
                    <strong>macOS</strong> : glisse l’app <strong>Visual Studio Code</strong>{" "}
                    dans le dossier <em>Applications</em>.
                    </li>
                    <li>
                    <strong>Linux</strong> : suis l’installeur recommandé pour ta distribution
                    depuis le site (deb/rpm/snap).
                    </li>
                </ul>
                </li>
            </ul>
            </div>

            <div className="chapter-section">
            <h2 className="section-title">Paramétrer VS Code (extensions recommandées)</h2>

            <h3>A&#41; Installer l’extension Python</h3>
            <p>
                Dans VS Code, ouvre l’onglet <strong>Extensions</strong> et installe :
            </p>
            <ul className="clean-list">
                <li>
                <strong>Python</strong> (Microsoft)
                </li>
            </ul>

            <h3>B&#41; À quoi ça sert ?</h3>
            <p>
                Cette extension apporte notamment : coloration syntaxique, auto‑complétion,
                exécution, et débogage.
            </p>

            <div className="chapter-callout">
                <strong>Astuce :</strong> redémarre VS Code si tu ne vois pas les options
                d’exécution/débogage après l’installation.
            </div>
            </div>
             <nav className="chapter-navigation">
                <Link className="btn-prev" to="/coursEtTutos/base-python/sommaire">
                    ← Retour Sommaire Python
                </Link>

                <Link className="btn-next" to="/coursEtTutos/base-python/python-premier-pas">
                    Chapitre 02 → Premier pas
                </Link>
            </nav>
            
        </section>
       
        </main>
    );
}