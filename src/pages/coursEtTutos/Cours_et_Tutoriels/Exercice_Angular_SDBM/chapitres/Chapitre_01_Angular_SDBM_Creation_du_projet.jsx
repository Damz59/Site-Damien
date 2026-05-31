// Chapitre_01_Angular_SDBM_Creation_du_Projet.jsx
import { Link } from "react-router-dom";
import "./Chapitre_Angular_SDBM.css";

export default function Chapitre_01_Angular_SDBM_Creation_du_Projet() {
	return (
		<main className="page-content">
		<div className="stack-logos">
			<img src="/icones/Angular.svg" alt="Angular" className="Angular-logo" />
			<span className="logo-plus">+</span>
			<img
			src="/icones/TypeScript.svg"
			alt="TypeScript"
			className="TypeScript-logo"
			/>
		</div>

		<header className="chapter-header">
			<h2 className="chapter-title">Chapitre 01 — Création du projet Angular (SDBM)</h2>
			<p className="chapter-subtitle">
			Objectif : créer un projet Angular propre, vérifier que l’application démarre, et préparer la base
			(routing + structure) pour la suite de l’exercice SDBM.
			</p>
		</header>

		<div className="chapter-card">
			{/* A */}
			<section className="chapter-section">
			<h3 className="section-title">A&#41; Pré-requis</h3>

			<ul className="clean-list">
				<li>
				<strong>Node.js</strong> (version LTS recommandée)
				</li>
				<li>
				<strong>npm</strong>
				</li>
				<li>
				<strong>Angular CLI</strong>
				</li>
				<li>
				<strong>VS Code</strong> (ou équivalent)
				</li>
			</ul>

			<div className="chapter-subcard">
				<h4 className="sub-title">Pourquoi c’est important ?</h4>
				<p className="mb-2">
				Angular dépend de Node/npm pour installer les dépendances et lancer le serveur de dev.
				La majorité des problèmes au début viennent d’une version Node trop ancienne, ou d’un CLI mal installé.
				</p>

				<h4 className="sub-title">Vérifier Node / npm</h4>
				<div className="cmd">
				<code>{`node -v\nnpm -v`}</code>
				</div>

				<h4 className="sub-title">Installer Angular CLI (si besoin)</h4>
				<div className="cmd">
				<code>npm install -g @angular/cli</code>
				</div>

				<h4 className="sub-title">Vérifier Angular CLI</h4>
				<div className="cmd">
				<code>ng version</code>
				</div>

				<div className="chapter-callout subtle">
				Tip : si <code>ng</code> n’est pas reconnu, ferme/réouvre le terminal (ou redémarre VS Code) après l’installation.
				</div>
			</div>
			</section>

			{/* B */}
			<section className="chapter-section">
			<h3 className="section-title">B&#41; Créer le projet Angular</h3>

			<p>
				On crée un projet nommé <strong>angular-sdbm</strong>. On active le routing dès le départ, car l’exercice
				va contenir plusieurs vues (sommaire, chapitres, etc.).
			</p>

			<div className="chapter-subcard">
				<h4 className="sub-title">Commande</h4>
				<div className="cmd">
				<code>ng new angular-sdbm --routing --style=css</code>
				</div>

				<p className="mb-2">Pendant la création, Angular te pose souvent des questions :</p>

				<ul className="clean-list">
				<li>
					<strong>SSR / SSG</strong> : réponds <strong>No</strong> (on veut une app simple, pas de rendu serveur).
				</li>
				<li>
					<strong>AI tools best practices</strong> : choisis <strong>None</strong> (tu pourras le faire plus tard si besoin).
				</li>
				</ul>

				<div className="chapter-callout subtle">
				Pourquoi “No” pour SSR ? Parce que ça ajoute une partie serveur Node + une complexité de build/déploiement.
				Pour un exercice CRUD qui consomme une API Spring Boot, ce n’est pas utile.
				</div>

				<div className="chapter-callout subtle">
				Pourquoi “None” pour AI tools ? Ça génère des fichiers de règles pour Cursor/Copilot/etc. Ça n’est pas indispensable
				si tu veux juste avancer sur l’exercice.
				</div>
			</div>

			<div className="chapter-subcard">
				<h4 className="sub-title">Erreurs fréquentes</h4>
				<ul className="clean-list mb-0">
				<li>
					<strong>Chemin Windows trop long / dossier sur clé USB</strong> : évite si possible, ça peut créer des soucis
					(perf + droits + chemins).
				</li>
				<li>
					<strong>Versions incompatibles</strong> : si tu as des erreurs après <code>ng new</code>, vérifie <code>node -v</code> et{" "}
					<code>ng version</code>.
				</li>
				</ul>
			</div>
			</section>

			{/* A2 */}
			<section className="chapter-section">
			<h3 className="section-title">A2&#41; (Optionnel) Installer Bootstrap</h3>

			<p className="mb-2">
				Bootstrap n’est pas obligatoire, mais ça aide à avoir rapidement une UI propre (boutons, formulaires, layout, etc.).
			</p>

			<div className="chapter-subcard">
				<h4 className="sub-title">Installer Bootstrap</h4>
				<div className="cmd">
				<code>npm install bootstrap</code>
				</div>

				<h4 className="sub-title">Importer Bootstrap</h4>
				<p className="mb-2">
				Dans <code>src/styles.css</code> :
				</p>
				<div className="cmd">
				<code>@import "bootstrap/dist/css/bootstrap.min.css";</code>
				</div>

				<div className="chapter-callout subtle">
				Tip : si tu ne vois pas les styles, vérifie que tu as bien relancé <code>ng serve</code>.
				</div>
				<div className="chapter-subcard">
					<h4 className="sub-title">Structure (exemple)</h4>
					<div className="cmd">
						<pre>
							<code>{`
		src/
		└─ app/ 
		├─ core/
		│  └─ api/
		│     └─ api.service.ts
		├─ pages/
		│  └─ articles/
		│     ├─ articles-list/
		│     │  ├─ articles-list.component.ts
		│     │  ├─ articles-list.component.html
		│     │  └─ articles-list.component.css
		│     ├─ article-detail/
		│     │  ├─ article-detail.component.ts
		│     │  ├─ article-detail.component.html
		│     │  └─ article-detail.component.css
		│     └─ article-form/
		│        ├─ article-form.component.ts
		│        ├─ article-form.component.html
		│        └─ article-form.component.css
		├─ app-routing.module.ts
		└─ app.module.ts`}
						</code>
					</pre>
					</div>
				</div>
			</div>
			</section>

			{/* C */}
			<section className="chapter-section">
			<h3 className="section-title">C&#41; Démarrer l’application</h3>
			<p>On lance le serveur de dev Angular et on vérifie que tout fonctionne.</p>

			<div className="chapter-subcard">
				<h4 className="sub-title">Lancer le serveur</h4>
				<div className="cmd">
				<pre>
					<code>{`
	cd angular-sdbm
	ng serve -o`}
					</code>
				</pre>
				</div>

				<p className="mb-2">
				L’application doit s’ouvrir sur <code>http://localhost:4200</code>.
				</p>

				<div className="chapter-callout subtle">
				Si le port 4200 est déjà pris : <code>ng serve --port 4201</code>
				</div>
			</div>
			</section>

			{/* B - Structure */}
			<section className="chapter-section">
			<h3 className="section-title">B&#41; Structure recommandée</h3>

			<p className="mb-2">
				Dans <code>src/app/</code> (objectif : garder une structure lisible dès le départ), on peut organiser comme ceci :
			</p>

			<div className="chapter-subcard">
				<h4 className="sub-title">Structure conseillée</h4>
				<div className="cmd">
					<pre>
						<code>{`
		src/
		app/
		core/         (services, guards, interceptors)
		shared/       (composants réutilisables)
		features/     (écrans / modules fonctionnels)
		app-routing.module.ts
		app.module.ts`}
						</code>
					</pre>
				</div>

				<ul className="clean-list mb-0">
				<li>
					<strong>core</strong> : services globaux (API, auth, interceptors…)
				</li>
				<li>
					<strong>shared</strong> : composants réutilisables (UI)
				</li>
				<li>
					<strong>features</strong> : fonctionnalités (sommaire, chapitres…)
				</li>
				</ul>
			</div>

			<div className="chapter-subcard">
				<h4 className="sub-title">But de cette structure</h4>
				<ul className="clean-list mb-0">
				<li>Faciliter la lecture du projet</li>
				<li>Éviter un dossier app/ “fourre-tout”</li>
				<li>Préparer l’arrivée du service HTTP (appel API Spring Boot)</li>
				</ul>
			</div>
			</section>

			{/* E */}
			<section className="chapter-section">
			<h3 className="section-title">Points de contrôle</h3>

			<ul className="clean-list">
				<li>Angular CLI installé et fonctionnel</li>
				<li>Projet créé avec routing</li>
				<li>
				<code>ng serve</code> démarre sans erreur
				</li>
				<li>
				La page s’affiche sur <code>localhost:4200</code>
				</li>
				<li>(Optionnel) Bootstrap est chargé si tu l’as installé</li>
			</ul>

			<div className="chapter-callout subtle">
				Si tu as une erreur, copie le message exact et note : version Node + version Angular CLI.
				C’est ce qui permet de corriger le plus vite.
			</div>
			</section>
			{/* Navigation */}
			<div className="chapter-navigation">
				<Link className="btn-prev" to="/coursEtTutos/angular-sdbm/sommaire">
				← Précédent → Sommaire
				</Link>

				<Link
				className="btn-next"
				to="/coursEtTutos/angular-sdbm/connexion-api-routing-crud"
				>
				Suivant → Chapitre 02 →
				</Link>
			</div>
			</div>
		</main>
	);
}