// Chapitre_02_Python_Premiers_Pas.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Chapitre_Python.css";

export default function Chapitre_02_Python_Premiers_Pas() {
    return (
        <main className="flex-grow-1 overflow-auto page-content">
        {/* Banner */}
        <header className="chapter-header">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
                <h1 className="chapter-title">Chapitre 2 — Premiers pas avec Python</h1>
                <p className="chapter-subtitle mb-0">
                Dans ce chapitre, tu vas installer Python, créer ton premier programme, et apprendre les bases :
                variables, types, entrées/sorties, et exécution.
                </p>
            </div>
            </div>
        </header>

        {/* Main card */}
        <section className="chapter-card">
            {/* ===================================================== */}
            <div className="chapter-section">
            <h2 className="section-title">1&#41; Installer Python</h2>

            <ul className="clean-list">
                <li>
                Téléchargement officiel :{" "}
                <a href="https://www.python.org/downloads/" target="_blank" rel="noreferrer">
                    https://www.python.org/downloads/
                </a>
                </li>
            </ul>

            <div className="chapter-callout">
                <strong>Astuce (Windows) :</strong> coche <strong>“Add Python to PATH”</strong> pendant l’installation.
            </div>

            <h3>Vérifier l’installation dans un terminal</h3>
            <ul className="clean-list">
                <li>
                <code>python --version</code> (ou <code>python3 --version</code> sur Linux/macOS)
                </li>
                <li>
                <code>pip --version</code>
                </li>
            </ul>
            </div>

            {/* ===================================================== */}
            <div className="chapter-section">
            <h2 className="section-title">2&#41; Créer un projet et un environnement virtuel (venv)</h2>

            <p>
                Dans un dossier de projet (ex : <code>cours-python/chapitre2/</code>) :
            </p>

            <h3>1&#41; Créer l’environnement</h3>
            <ul className="clean-list">
                <li>
                <strong>Windows</strong> : <code>py -m venv .venv</code> (recommandé) ou{" "}
                <code>python -m venv .venv</code>
                </li>
                <li>
                <strong>macOS / Linux</strong> : <code>python3 -m venv .venv</code>
                </li>
            </ul>

            <div className="chapter-callout">
                <strong>Cas “clé USB” (si ça bloque longtemps sur l’installation de pip) :</strong>
                <ol className="mt-2 mb-0">
                <li>
                    <code>py -m venv .venv --without-pip</code>
                </li>
                <li>Active le venv (voir ci-dessous)</li>
                <li>
                    <code>python -m ensurepip --upgrade</code> puis{" "}
                    <code>python -m pip install --upgrade pip</code>
                </li>
                </ol>
            </div>

            <h3>2&#41; Activer</h3>
            <ul className="clean-list">
                <li>
                <strong>Windows (PowerShell)</strong> : <code>.\.venv\Scripts\Activate.ps1</code>
                </li>
                <li>
                <strong>macOS / Linux</strong> : <code>source .venv/bin/activate</code>
                </li>
            </ul>

            <h3>3&#41; Mettre à jour pip</h3>
            <ul className="clean-list">
                <li>
                <code>python -m pip install --upgrade pip</code>
                </li>
            </ul>
            </div>

            {/* ===================================================== */}
            <div className="chapter-section">
            <h2 className="section-title">3&#41; Ton premier script : Hello World</h2>

            <p>
                Crée un fichier <code>main.py</code> :
            </p>

            <pre className="code-block">
                <code>{`print("Hello, world!")`}</code>
            </pre>

            <p className="mb-2">Exécuter :</p>
            <ul className="clean-list">
                <li>
                <code>python main.py</code> (ou <code>python3 main.py</code>)
                </li>
            </ul>
            </div>

            {/* ===================================================== */}
            <div className="chapter-section">
            <h2 className="section-title">4&#41; Variables et types (mini-base)</h2>

            <pre className="code-block">
                <code>{`
    nom = "Damien"     # str
    age = 30           # int
    taille = 1.78      # float
    est_ok = True      # bool

    print(nom, age, taille, est_ok)
    print(type(nom), type(age))`}
                </code>
            </pre>
            </div>

            {/* ===================================================== */}
            <div className="chapter-section">
            <h2 className="section-title">5&#41; Entrée utilisateur + conversion</h2>

            <pre className="code-block">
                <code>{`
    prenom = input("Ton prénom ? ")
    annee = int(input("Ton année de naissance ? "))
    age = 2026 - annee
    print(f"Salut {prenom}, tu as environ {age} ans.")`}
                </code>
            </pre>

            <div className="chapter-callout">
                <strong>Rappel :</strong> <code>input()</code> renvoie toujours du texte (<code>str</code>), donc il faut
                convertir avec <code>int(...)</code> / <code>float(...)</code> quand nécessaire.
            </div>
            </div>

            {/* ===================================================== */}
            <div className="chapter-section">
            <h2 className="section-title">Exercices (à faire)</h2>

            <ul className="clean-list checklist">
                <li>
                <label>
                    <input type="checkbox" readOnly /> Installer Python + vérifier <code>python</code> et <code>pip</code>
                </label>
                </li>
                <li>
                <label>
                    <input type="checkbox" readOnly /> Créer un projet + venv + activer l’environnement
                </label>
                </li>
                <li>
                <label>
                    <input type="checkbox" readOnly /> Faire <strong>Hello World</strong>
                </label>
                </li>
                <li>
                <label>
                    <input type="checkbox" readOnly /> Faire un script qui demande 2 nombres et affiche la somme
                </label>
                </li>
                <li>
                <label>
                    <input type="checkbox" readOnly /> Faire un script qui convertit des °C en °F
                </label>
                </li>
            </ul>
            </div>

            {/* Navigation */}
            <nav className="chapter-navigation">
            <Link className="btn-prev" to="/coursEtTutos/base-python/environnement-python">
                ← Chapitre 01
            </Link>
            <Link className="btn-next" to="/coursEtTutos/base-python/python-condition-boucle-fonction">
                Chapitre 03 →
            </Link>
            </nav>
        </section>
        </main>
    );
}