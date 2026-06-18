// Chapitre_03_Python_Conditions_Boucles_Fonctions.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Chapitre_Python.css";

export default function Chapitre_03_Python_Conditions_Boucles_Fonctions() {
    return (
        <main className="flex-grow-1 overflow-auto page-content">
        {/* Banner */}
        <header className="chapter-header">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
                <h1 className="chapter-title">Chapitre 3 — Conditions, boucles et fonctions</h1>
                <p className="chapter-subtitle mb-0">
                Objectif : écrire des scripts plus “intelligents” grâce aux tests (if), répétitions (boucles),
                et à la réutilisation de code (fonctions).
                </p>
            </div>
            </div>
        </header>

        {/* Main card */}
        <section className="chapter-card">
            {/* ===================================================== */}
            <div className="chapter-section">
            <h2 className="section-title">1&#41; Conditions (if / elif / else)</h2>

            <h3>A&#41; Principe</h3>
            <p>Une condition permet d’exécuter du code seulement si un test est vrai.</p>

            <h3>B&#41; Exemple</h3>
            <pre className="code-block">
                <code>{`
    age = int(input("Ton âge ? "))

    if age >= 18:
        print("Majeur")
    elif age >= 16:
        print("Presque majeur")
    else:
        print("Mineur")`}
                </code>
            </pre>

            <h3>C&#41; Opérateurs utiles</h3>
            <ul className="clean-list">
                <li>
                Comparaisons : <code>==</code>, <code>!=</code>, <code>{"<"}</code>, <code>{"<="}</code>,{" "}
                <code>{">"}</code>, <code>{">="}</code>
                </li>
                <li>
                Logique : <code>and</code>, <code>or</code>, <code>not</code>
                </li>
            </ul>

            {/* AJOUT: équivalent switch en Python */}
            <h3>D&#41; Exemple “switch” (match / case) — Python 3.10+</h3>
            <pre className="code-block">
                <code>{`
    choix = input("Choisis : start / stop / pause : ")

    match choix:
        case "start":
            print("Démarrage…")
        case "stop":
            print("Arrêt.")
        case "pause":
            print("Pause.")
        case _:
            print("Commande inconnue")`}
                </code>
            </pre>
            <p className="text-muted mb-0">
                <strong>Note :</strong> <code>match/case</code> fonctionne à partir de Python 3.10.
            </p>
            </div>

            {/* ===================================================== */}
            <div className="chapter-section">
            <h2 className="section-title">2&#41; Boucles (for / while)</h2>

            <h3>A&#41; for (itérer)</h3>
            <pre className="code-block">
                <code>{`
        for i in range(5):
        print(i)`}
                </code>
            </pre>

            <h3>B&#41; while (répéter tant que)</h3>
            <pre className="code-block">
                <code>{`
    mot_de_passe = "python"
    saisie = input("Mot de passe ? ")
    while saisie != mot_de_passe:
        print("Erreur")
        saisie = input("Mot de passe ? ")

    print("OK")`}
                </code>
            </pre>

            <h3>C&#41; break / continue</h3>
            <ul className="clean-list">
                <li>
                <code>break</code> : sort de la boucle
                </li>
                <li>
                <code>continue</code> : passe à l’itération suivante
                </li>
            </ul>
            </div>

            {/* ===================================================== */}
            <div className="chapter-section">
            <h2 className="section-title">3&#41; Fonctions (def)</h2>

            <h3>A&#41; Pourquoi</h3>
            <p>Une fonction permet de regrouper du code et de le réutiliser.</p>

            <h3>B&#41; Exemple</h3>
            <pre className="code-block">
                <code>{`
    def aire_rectangle(largeur, hauteur):
        return largeur * hauteur

    print(aire_rectangle(3, 4))`}
                </code>
            </pre>

            <h3>C&#41; Paramètres par défaut</h3>
            <pre className="code-block">
                <code>{`
    def saluer(prenom="toi"):
        print(f"Salut {prenom} !")

    saluer()
    saluer("Damien")`}
                </code>
            </pre>
            </div>

            {/* ===================================================== */}
            <div className="chapter-section">
            <h2 className="section-title">4&#41; Mini-exos (progressifs)</h2>
            <ul className="clean-list">
                <li>
                Faire un programme qui demande un nombre et affiche s’il est <strong>pair</strong> ou{" "}
                <strong>impair</strong>
                </li>
                <li>Afficher la table de multiplication de 7 (de 1 à 10)</li>
                <li>
                Demander des nombres à l’utilisateur jusqu’à taper <code>stop</code>, puis afficher la somme
                </li>
                <li>
                Écrire une fonction <code>max_de_deux(a, b)</code> qui renvoie le plus grand
                </li>
            </ul>
            </div>

            {/* ===================================================== */}
            <div className="chapter-section">
            <h2 className="section-title">Exercices (à faire)</h2>
            <ul className="clean-list checklist">
                <li>
                <label>
                    <input type="checkbox" readOnly /> Comprendre <code>if / elif / else</code> +{" "}
                    <code>and/or/not</code>
                </label>
                </li>
                <li>
                <label>
                    <input type="checkbox" readOnly /> Faire une boucle <code>for</code> avec <code>range()</code>
                </label>
                </li>
                <li>
                <label>
                    <input type="checkbox" readOnly /> Faire une boucle <code>while</code> + condition d’arrêt
                </label>
                </li>
                <li>
                <label>
                    <input type="checkbox" readOnly /> Écrire au moins 2 fonctions avec <code>return</code>
                </label>
                </li>
            </ul>
            </div>

            {/* Navigation */}
            <nav className="chapter-navigation">
            <Link className="btn-prev" to="/coursEtTutos/base-python/python">
                ← Chapitre 02
            </Link>

            {/* slug que tu as validé */}
            <Link className="btn-next" to="/coursEtTutos/base-python/python-conditions-boucles-fonctions">
                Chapitre 04 →
            </Link>
            </nav>
        </section>
        </main>
    );
    }