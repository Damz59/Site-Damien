import { Link } from "react-router-dom";
import "./Chapitre_Java_SDBM.css";

export default function Chapitre_02_Java_SDBM_Creation_des_entites() {
	return (
		<main className="page-content">
			<div className="stack-logos">
				<img src="/icones/Java.svg" className="Java-logo" alt="Java" />
				<span className="logo-plus">+</span>
				<img src="/icones/Spring.svg" className="Spring-logo" alt="Spring Boot" />
			</div>

			<header className="chapter-header">
				<h2 className="chapter-title">Chapitre 02 — Création des entités</h2>
				<p className="chapter-subtitle">
					Objectif : modéliser la base sdbm en Java avec JPA en créant les entités (tables → classes), leurs champs
					et leurs relations, pour que Spring/Hibernate puisse mapper la base correctement.
				</p>
			</header>

			<div className="chapter-card">
				{/* A) */}
				<section className="chapter-section">
					<h3 className="section-title">A&#41; Rappel du MCD (schéma)</h3>
					<p>
						Avant d’écrire du code, on repart du <strong>MCD</strong> (ou du schéma de la base) pour identifier :
						les tables, les clés primaires, les clés étrangères et les relations.
					</p>

					<img
						src="/Exercice_Java_SDBM/MCD_SDBM.png"
						alt="MCD SDBM"
						className="img-fluid chapter-image d-block mx-auto my-5"
					/>

					<div className="chapter-callout subtle">Schema du MCD.</div>
				</section>

				{/* B) */}
				<section className="chapter-section">
					<h3 className="section-title">B&#41; Créer la première entité (table → classe)</h3>
					<p>
						On va créer une première classe <strong>@Entity</strong> qui correspond à une table (ex : <code>Nom</code>).
						Le but est de valider la méthode : 1 table = 1 classe, avec l’ID + les colonnes.
					</p>

					<ul className="clean-list">
						<li>
							Crée un package dédié (par exemple) : <code>com.dv.NomProjet.Entities</code>
						</li>
						<li>
							Crée une classe : <code>Nom</code> (à adapter au nom réel de ta table)
						</li>
						<li>
							Ajoute au minimum : <code>&#64;Entity</code>, <code>&#64;Id</code>, <code>&#64;GeneratedValue</code>
						</li>
					</ul>
				</section>

				{/* C) */}
				<section className="chapter-section">
					<h3 className="section-title">C&#41; Exemple vierge (squelette) — 1 table = 1 classe</h3>
					<p>
						Avant de coder une vraie entité, on part d’un <strong>squelette</strong> “neutre” pour bien comprendre les
						annotations JPA.
					</p>

					<ul className="clean-list">
						<li>
							<code>&#64;Entity</code> : indique à JPA/Hibernate que la classe doit être persistée.
						</li>
						<li>
							<code>&#64;Table(name = "...")</code> : nom exact de la table en base.
						</li>
						<li>
							<code>&#64;Id</code> : clé primaire.
						</li>
						<li>
							<code>&#64;GeneratedValue(...)</code> : auto-incrément (souvent en MariaDB/MySQL).
						</li>
					</ul>

					<div className="cmd">
						<pre className="code">
							{`
                                package com.dv.NomProjet.Entities;

                                import jakarta.persistence.*;

                                @Entity
                                @Table(name = "nom") // à adapter (nom exact de la table)
                                public class Nom {

                                    @Id
                                    @GeneratedValue(strategy = GenerationType.IDENTITY)
                                    private Long id;

                                    // exemples de colonnes (à adapter)
                                    // @Column(nullable = false)
                                    // private String nom;
                                }
                            `}
						</pre>
					</div>
				</section>

				{/* D) */}
				<section className="chapter-section">
					<h3 className="section-title">D&#41; Exemple (JPA) — table CONTINENT</h3>
					<p>
						On commence par une table très simple : <code>CONTINENT</code> (2 champs). Ensuite, on enchaîne avec{" "}
						<code>PAYS</code> qui aura une FK <code>ID_CONTINENT</code> (relation <code>@ManyToOne</code>).
					</p>

					<div className="chapter-callout subtle">
						<strong>Table CONTINENT</strong> : ID_CONTINENT (PK), NOM_CONTINENT
					</div>

					<p>
						<strong>1&#41; Rappel</strong> : <code>ID_CONTINENT</code> (PK, INT), <code>NOM_CONTINENT</code> (VARCHAR)
					</p>

					<p>
						<strong>2&#41; Entité Continent</strong> — <code>src/main/java/com/dv/sdbmserver/Entities/Continent.java</code>
					</p>

					<div className="cmd">
						<pre className="code">
							{`
                                package com.dv.sdbmserver.Entities;

                                import jakarta.persistence.*;
                                import lombok.Getter;
                                import lombok.NoArgsConstructor;
                                import lombok.Setter;

                                @Entity
                                @Table(name = "CONTINENT")
                                @Getter
                                @Setter
                                @NoArgsConstructor
                                public class Continent {

                                    @Id
                                    @GeneratedValue(strategy = GenerationType.IDENTITY)
                                    @Column(name = "ID_CONTINENT")
                                    private Integer idContinent;

                                    @Column(name = "NOM_CONTINENT", nullable = false, length = 255)
                                    private String nomContinent;
                                }
                            `}
						</pre>
					</div>

					<p>
						<strong>3&#41; (Option) Lombok — utilité et intégration</strong>
					</p>
					<p>
						<strong>Lombok</strong> sert à éviter d’écrire du code répétitif (getters/setters/constructeurs). Ici :
						<code>&#64;Getter</code>, <code>&#64;Setter</code>, <code>&#64;NoArgsConstructor</code>.
					</p>

					<ul className="clean-list">
						<li>Ajoute la dépendance Lombok (Spring Initializr ou Maven).</li>
						<li>Active “Annotation processing” dans l’IDE si nécessaire.</li>
					</ul>

					<div className="cmd">
						<pre className="code">
							{`
                                // Même entité, version sans commentaires
                                package com.dv.sdbmserver.Entities;

                                import jakarta.persistence.*;
                                import lombok.Getter;
                                import lombok.NoArgsConstructor;
                                import lombok.Setter;

                                @Entity
                                @Table(name = "CONTINENT")
                                @Getter
                                @Setter
                                @NoArgsConstructor
                                public class Continent {

                                    @Id
                                    @GeneratedValue(strategy = GenerationType.IDENTITY)
                                    @Column(name = "ID_CONTINENT")
                                    private Integer idContinent;

                                    @Column(
                                        name = "NOM_CONTINENT",
                                        nullable = false,
                                        length = 255
                                    )
                                    private String nomContinent;
                                }
                            `}
						</pre>
					</div>
				</section>

				{/* E) */}
				<section className="chapter-section">
					<h3 className="section-title">E&#41; Repository — à quoi ça sert ?</h3>
					<p>
						Un <strong>repository</strong> (Spring Data JPA) est une interface qui donne accès aux opérations CRUD
						sur une entité sans écrire de SQL : <code>save</code>, <code>findAll</code>, <code>findById</code>,{" "}
						<code>deleteById</code>, etc.
					</p>

					<p>
						<strong>Exemple vierge</strong> :
					</p>

					<div className="cmd">
						<pre className="code">
							{`
                                package com.dv.NomProjet.repositories;

                                import com.dv.NomProjet.entities.Nom;
                                import org.springframework.data.jpa.repository.JpaRepository;

                                public interface NomRepository extends JpaRepository<Nom, Integer> {}
                            `}
						</pre>
					</div>

					<p>
						<strong>Repository concret pour Continent</strong> :
					</p>

					<div className="cmd">
						<pre className="code">
							{`
                                package com.dv.sdbmserver.Repositories;

                                import org.springframework.data.jpa.repository.JpaRepository;
                                import com.dv.sdbmserver.Entities.Continent;

                                public interface ContinentRepository extends JpaRepository<Continent, Integer> {}
                            `}
						</pre>
					</div>
				</section>

				{/* F) */}
				<section className="chapter-section">
					<h3 className="section-title">F&#41; Test rapide (HTTP) — vérifier que l’API répond</h3>

					<p>
						Si ton projet démarre mais que tu as un 404 sur <code>http://localhost:8081/</code>, c’est normal : tu
						n’as pas encore créé de route.
					</p>

					<p>
						Rôle d’un <strong>controller</strong> : c’est la classe qui reçoit les requêtes HTTP (GET/POST/PUT/DELETE)
						et qui renvoie une réponse (texte, JSON, etc.). En gros, c’est le “point d’entrée” de ton API : sans
						controller, Spring Boot tourne, mais aucune URL n’est exposée.
					</p>

					<p>
						Crée un controller de test (adapte le package au tien), puis relance Spring Boot. Ensuite ouvre{" "}
						<code>http://localhost:8081/</code> : tu dois voir <strong>API OK</strong>.
					</p>

					<div className="cmd">
						<pre className="code">
							{`
                                package com.dv.sdbmserver.Controller;

                                import org.springframework.web.bind.annotation.GetMapping;
                                import org.springframework.web.bind.annotation.RestController;

                                @RestController
                                public class HelloController {

                                    @GetMapping("/")
                                    public String home() {
                                        return "API OK";
                                    }
                                }
                            `}
						</pre>
					</div>
				</section>

                <h3 className="section-title">4&#41; Crée un controller minimal qui renvoie la liste des continents depuis le repository.</h3>
                <p>Exemple plus concret avec Continent (tester un vrai endpoint) :</p>

                <pre className="code">
                    {`
                        package com.dv.sdbmserver.Controller;

                        import java.util.List;

                        import org.springframework.web.bind.annotation.GetMapping;
                        import org.springframework.web.bind.annotation.RequestMapping;
                        import org.springframework.web.bind.annotation.RestController;

                        import com.dv.sdbmserver.Entities.Continent;
                        import com.dv.sdbmserver.Repositories.ContinentRepository;

                        @RestController
                        @RequestMapping("/test")
                        public class ContinentController {

                            private final ContinentRepository continentRepository;

                            public ContinentController(ContinentRepository continentRepository) {
                                this.continentRepository = continentRepository;
                            }

                            @GetMapping("/continents")
                            public List<Continent> getAllContinents() {
                                return continentRepository.findAll();
                            }
                        }
                    `}
                </pre>

				{/* G) DTO */}
                <section className="chapter-section">
                    <h3 className="section-title">G&#41; DTO — Structurer les échanges API</h3>

                    <p>
                        Un <strong>DTO</strong> (Data Transfer Object) est un objet “simple” utilisé pour échanger des données entre
                        l’API et le client (front, Postman, etc.). L’intérêt principal est de ne pas exposer directement tes entités
                        JPA (qui peuvent contenir des relations, des champs techniques, ou poser des soucis de sérialisation).
                    </p>

                    <p><strong>Exemple vierge (DTO minimal)</strong> :</p>
                    <div className="cmd">
                        <pre className="code">
                            {`
                                package com.dv.sdbmserver.Dto;

                                import lombok.Getter;
                                import lombok.Setter;

                                @Getter
                                @Setter
                                public class NomDto {
                                    private Integer id;
                                    private String nom;
                                }
                            `}
                        </pre>
                    </div>

                    <p>
                        <strong>DTO concret pour Continent</strong> —{" "}
                        <code>src/main/java/com/dv/sdbmserver/Dto/ContinentDto.java</code>
                    </p>
                    <div className="cmd">
                        <pre className="code">
                            {`
                                package com.dv.sdbmserver.Dto;

                                import lombok.Getter;
                                import lombok.Setter;

                                @Getter
                                @Setter
                                public class ContinentDto {
                                    private Integer idContinent;
                                    private String nomContinent;
                                }
                            `}
                        </pre>
                    </div>
                </section>

                {/* H) Service */}
                <section className="chapter-section">
                    <h3 className="section-title">H&#41; Service — Organiser la logique métier</h3>

                    <p>
                        Un <strong>service</strong> contient la logique métier (règles, validations, orchestration) et sert
                        d’intermédiaire entre le controller (HTTP) et le repository (accès DB). Ça rend le code plus propre :
                        controller “fin”, repository “data access”, et règles métier dans le service.
                    </p>

                    <p><strong>Exemple vierge (service générique)</strong> :</p>
                    <div className="cmd">
                        <pre className="code">
                            {`
                                package com.dv.sdbmserver.Services;

                                import org.springframework.stereotype.Service;

                                @Service
                                public class NomService {
                                    // ici : règles métier + appels repository
                                }
                            `}
                        </pre>
                    </div>

                    <p>
                        <strong>Service concret : ContinentService</strong> —{" "}
                        <code>src/main/java/com/dv/sdbmserver/Services/ContinentService.java</code>
                    </p>
                    <div className="cmd">
                        <pre className="code">
                            {`
                                package com.dv.sdbmserver.Services;

                                import java.util.List;
                                import java.util.stream.Collectors;

                                import org.springframework.stereotype.Service;

                                import com.dv.sdbmserver.Dto.ContinentDto;
                                import com.dv.sdbmserver.Entities.Continent;
                                import com.dv.sdbmserver.Repositories.ContinentRepository;

                                @Service // indique à Spring que cette classe est un composant "Service" (gérée par l'injection de dépendances)
                                public class ContinentService {

                                    // On stocke le repository dans un champ final : le service en dépend pour accéder à la DB
                                    private final ContinentRepository continentRepository;

                                    // Constructeur : Spring injecte automatiquement ContinentRepository ici
                                    public ContinentService(ContinentRepository continentRepository) {
                                        this.continentRepository = continentRepository;
                                    }

                                    // Méthode "métier" : renvoyer tous les continents, mais sous forme de DTO (pas l'entité JPA)
                                    public List<ContinentDto> findAll() {
                                        return continentRepository
                                            .findAll() // récupère tous les Continent en base
                                            .stream() // transforme la liste en stream
                                            .map(this::toDto) // convertit chaque Continent en ContinentDto
                                            .collect(Collectors.toList()); // reconstruit une List<ContinentDto>
                                    }

                                    // Méthode interne de conversion Entity -> DTO
                                    private ContinentDto toDto(Continent continent) {
                                        ContinentDto dto = new ContinentDto();
                                        dto.setIdContinent(continent.getIdContinent());
                                        dto.setNomContinent(continent.getNomContinent());
                                        return dto;
                                    }
                                }
                            `}
                        </pre>
                    </div>

                    <p>
                        <strong>(Option) Brancher le service dans un controller</strong> — endpoint <code>GET /continents</code>
                    </p>
                    <div className="cmd">
                        <pre className="code">
                            {`
                                package com.dv.sdbmserver.Services;

                                import java.util.List;
                                import java.util.stream.Collectors;

                                import org.springframework.stereotype.Service;

                                import com.dv.sdbmserver.Dto.ContinentDto;
                                import com.dv.sdbmserver.Entities.Continent;
                                import com.dv.sdbmserver.Repositories.ContinentRepository;

                                @Service // indique à Spring que cette classe est un composant "Service" (gérée par l'injection de dépendances)
                                public class ContinentService {

                                    // On stocke le repository dans un champ final : le service en dépend pour accéder à la DB
                                    private final ContinentRepository continentRepository;

                                    // Constructeur : Spring injecte automatiquement ContinentRepository ici
                                    public ContinentService(ContinentRepository continentRepository) {
                                        this.continentRepository = continentRepository;
                                    }

                                    // Méthode "métier" : renvoyer tous les continents, mais sous forme de DTO (pas l'entité JPA)
                                    public List<ContinentDto> findAll() {
                                        return continentRepository
                                            .findAll() // récupère tous les Continent en base
                                            .stream() // transforme la liste en stream
                                            .map(this::toDto) // convertit chaque Continent en ContinentDto
                                            .collect(Collectors.toList()); // reconstruit une List<ContinentDto>
                                    }

                                    // Méthode interne de conversion Entity -> DTO
                                    private ContinentDto toDto(Continent continent) {
                                        ContinentDto dto = new ContinentDto();
                                        dto.setIdContinent(continent.getIdContinent());
                                        dto.setNomContinent(continent.getNomContinent());
                                        return dto;
                                    }
                                }
                        `}
                        </pre>
                    </div>

                    <div className="chapter-callout subtle">
                        Test : <strong>http://localhost:8081/continents</strong>
                    </div>
                </section>
			</div>
            <div className="chapter-navigation">
                <Link className="btn-prev" to="/coursEtTutos/java_sdbm/creation-du-projet">
                    ← Précédent
                </Link>

                <Link className="btn-next" to="/coursEtTutos/java_sdbm/relations-jpa">
                    Suivant → Chapitre 03
                </Link>
            </div>
		</main>
	);
}