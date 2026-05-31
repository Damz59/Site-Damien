import { Link } from "react-router-dom";
import "./Chapitre_Java_SDBM.css";


export default function Chapitre_01_Java_SDBM_Creation_du_Projet() {
	return (
		<main className="page-content">
			<div className="stack-logos">
				<img src="/icones/Java.svg" className="Java-logo" alt="Java" />
				<span className="logo-plus">+</span>
				<img src="/icones/Spring.svg" className="Spring-logo" alt="Spring Boot" />
			</div>

			<header className="chapter-header">
				<h2 className="chapter-title">Chapitre 01 — Création du projet</h2>
				<p className="chapter-subtitle">
				Objectif : générer un projet Spring Boot (Maven / Java 21) prêt pour MariaDB + JPA.
				</p>
			</header>

			<div className="chapter-card">
				<section className="chapter-section">
				<h3 className="section-title">A&#41; Générer le projet avec Spring Initializr</h3>
				<p>
					Pour créer la base du projet, utilise <strong>Spring Initializr</strong> :{" "}
					<a href="https://start.spring.io/" target="_blank" rel="noreferrer">
					https://start.spring.io/
					</a>
					.
				</p>
				<p>
					L’objectif est de générer un projet <strong>Maven + Java 21</strong>, déjà prêt à exposer une API
					(Spring Web) et à se connecter à <strong>MariaDB</strong> via <strong>Spring Data JPA</strong>.
				</p>

				<img
					src="/Exercice_Java_SDBM/Creation_Projet_SpringBoot.png"
					alt="Création du projet Spring Boot (Spring Initializr)"
					className="img-fluid chapter-image mx-auto my-5"
				/>
				</section>
				<section className="chapter-section">
				<h3 className="section-title">B&#41; Paramètres à choisir (SDBM / MariaDB)</h3>
				<ul className="clean-list">
					<li>
					<strong>Project</strong> : Maven
					</li>
					<li>
					<strong>Language</strong> : Java
					</li>
					<li>
					<strong>Spring Boot</strong> : dernière stable
					</li>
					<li>
					<strong>Packaging</strong> : Jar
					</li>
					<li>
					<strong>Java</strong> : 21
					</li>
					<li>
					<strong>Group</strong> : <code>com.dv</code>
					</li>
					<li>
					<strong>Artifact</strong> : <code>biere</code>
					</li>
					<li>
					<strong>Name</strong> : <code>biere</code>
					</li>
					<li>
					<strong>Package name</strong> : <code>com.dv.biere</code>
					</li>
				</ul>
				</section>
				<section className="chapter-section">
				<h3 className="section-title">C&#41; Dépendances à ajouter</h3>
				<ul className="clean-list">
					<li>Spring Web</li>
					<li>Spring Data JPA</li>
					<li>MariaDB Driver (ou MySQL Driver)</li>
					<li>
					<em>Optionnel :</em> Lombok
					</li>
				</ul>
				</section>
				<section className="chapter-section">
				<h3 className="section-title">D&#41; Génération du projet</h3>

				<ol className="clean-list">
					<li>Generate</li>
					<li>Télécharger le .zip</li>
					<li>Dézipper</li>
					<li>Ouvrir le dossier dans VS Code</li>
				</ol>

				<div className="chapter-subcard">
					<h4 className="sub-title">Où mettre le zip ?</h4>
					<p className="mb-2">
					Télécharge le zip dans <strong>Téléchargements</strong> (par défaut) : c’est très bien.
					</p>

					<h4 className="sub-title">Où le dézipper (recommandé)</h4>
					<p className="mb-2">Dézippe-le dans un dossier de projets “propre”, par exemple :</p>
					<ul className="clean-list">
					<li>
						<code>C:\dev\spring\</code>
					</li>
					<li>
						<code>C:\Users\Damien\Documents\Projets\Spring\</code>
					</li>
					</ul>

					<p className="mb-2">
					Évite autant que possible : les chemins trop longs, les dossiers avec caractères spéciaux/accents, et{" "}
					<strong>la sur un périphérique USB</strong> (ça marche, mais ça peut être plus lent et parfois créer des soucis de
					droits/chemins).
					</p>
				</div>

				{/* ✅ NOUVEAU : application.properties AVANT exécution */}
				<div className="chapter-subcard">
					<h4 className="sub-title">Avant d’exécuter : configurer application.properties</h4>
					<p className="mb-2">
					Avant de lancer le projet, il faut indiquer à Spring <strong>comment se connecter à la base MariaDB</strong>.
					Le fichier à modifier est :
					<br />
					<code>src/main/resources/application.properties</code>
					</p>

					<div className="cmd">
					<pre className="application.properties_code">
						{`
						spring.application.name=SDBM_server


						spring.datasource.url=jdbc:mariadb://localhost:3306/sdbm
						spring.datasource.username=root
						spring.datasource.password=
						spring.datasource.driver-class-name=org.mariadb.jdbc.Driver

						# Comme ton site web utilise déjà 8080 (dans mon cas) on rajoute le 8181 (Cette ligne n'est pas obligatoire si le port 8080 est libre)
						server.port=8081
						`}
					</pre>
					</div>

					<p className="mb-2">
					<strong>Pourquoi on ajoute ces lignes ?</strong> Parce que Spring Boot a besoin d’un <em>DataSource</em>
					(une “fiche de connexion”) pour que JPA/Hibernate puisse accéder à ta base <code>sdbm</code>.
					</p>

					<ul className="clean-list">
					<li>
						<code>spring.application.name</code> : donne un nom à l’application (<em>SDBM_server</em>). Utile pour les logs
						et certains outils Spring.
					</li>
					<li>
						<code>spring.datasource.url</code> : l’adresse JDBC de ta base MariaDB (ici <code>localhost</code>, port{" "}
						<code>3306</code>, base <code>sdbm</code>).
					</li>
					<li>
						<code>spring.datasource.username</code> / <code>spring.datasource.password</code> : identifiants de connexion.
						Avec XAMPP, <code>root</code> et mot de passe vide sont fréquents (à adapter si tu as mis un mot de passe).
					</li>
					<li>
						<code>spring.datasource.driver-class-name</code> : le driver JDBC MariaDB utilisé pour établir la connexion.
					</li>
					</ul>

					<div className="chapter-callout subtle">
					Attention : si ta base ne s’appelle pas exactement <code>sdbm</code> ou si MariaDB n’est pas sur le port{" "}
					<code>3306</code>, adapte l’URL.
					</div>
				</div>

				<div className="chapter-subcard">
					<h4 className="sub-title">Ensuite</h4>
					<ol className="clean-list">
					<li>
						Clic droit sur le zip → <strong>Extraire tout…</strong>
					</li>
					<li>
						Ouvre le dossier extrait dans VS Code (<em>File → Open Folder…</em>)
					</li>
					<li>
						Dans un terminal, à la racine du projet, lance :
						<div className="cmd">
						<code>.\mvnw.cmd spring-boot:run</code>
						</div>
					</li>
					</ol>
				</div>
				</section>
			</div>
			<div className="chapter-navigation">
				<button type="button" className="btn-prev" disabled>
					← Précédent
				</button>

				<Link className="btn-next" to="/coursEtTutos/java_sdbm/creation-des-entites">
					Suivant → Chapitre 02
				</Link>
			</div>
		</main>
		
	);
}