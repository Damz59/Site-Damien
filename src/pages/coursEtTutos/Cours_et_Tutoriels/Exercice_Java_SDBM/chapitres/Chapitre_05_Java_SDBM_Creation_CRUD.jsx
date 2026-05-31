import React from "react";
import { Link } from "react-router-dom";

export default function Chapitre_05_Java_SDBM_Creation_CRUD() {
	return (
		<main className="page-content">
            {/* Logos (si tu as les images dans /public) */}
			<div className="stack-logos">
				<img
					className="Java-logo"
					src="/icones/Java.svg"
					alt="Java"
				/>
				<span className="logo-plus">+</span>
				<img
					className="Spring-logo"
					src="/icones/Spring.svg"
					alt="Spring Boot"
				/>
			</div>
			<header className="chapter-header">
				<h1 className="chapter-title">
					Chapitre 05 — CRUD (Create / Read / Update / Delete)
				</h1>
				<p className="chapter-subtitle">
					Objectif : mettre en place un <strong>CRUD complet</strong> sur tes entités
					(ex : <code>Article</code>) avec un flow propre :
					<em> Entity → Repository → DTO → Service → Controller</em>, et apprendre à
					retourner des réponses API stables (DTO + erreurs HTTP propres).
				</p>
			</header>

			<div className="chapter-card">
				<section className="chapter-section">
					<h2 className="section-title">A) READ — récupérer des données (GET)</h2>

					<p>
						Objectif : exposer des routes <strong>GET</strong> qui permettent de :
					</p>
					<ul className="clean-list">
						<li>
							lister toutes les lignes d’une table (ex : tous les{" "}
							<code>Article</code>)
						</li>
						<li>
							récupérer une seule ligne par ID (ex : un <code>Article</code> précis)
						</li>
					</ul>

					<p>
						Principe : <strong>Controller</strong> reçoit la requête HTTP →{" "}
						<strong>Service</strong> applique la logique (et convertit en DTO) →{" "}
						<strong>Repository</strong> lit la BDD.
					</p>

					{/* =========================
                            A1) DTO de sortie (ArticleDto)
                        ========================= */}
                        <section className="chapter-section" id="a1-dto-article">
                            <h2 className="section-title">A1&#41; DTO de sortie (exemple : ArticleDto)</h2>

                            <p>
                                On renvoie un DTO “plat” (pas l’entité JPA complète) pour éviter les problèmes
                                de relations <code>LAZY</code> et garder un JSON propre.
                            </p>

                            <div className="chapter-callout">
                                <p>
                                    <strong>Objectif :</strong> créer un fichier{" "}
                                    <code>ArticleDto.java</code> dans{" "}
                                    <code>src/main/java/com/dv/sdbmserver/Dto/</code>.
                                </p>
                            </div>

                            <h3 className="section-subtitle">Code : ArticleDto.java</h3>

                            <pre className="code">
                                <code>{`
    package com.dv.sdbmserver.Dto;

    import lombok.Getter;
    import lombok.Setter;

    @Getter
    @Setter
    public class ArticleDto {
        private Integer id;
        private String nomArticle;

        // Exemples de champs 
        private String prixAchat;
        private Integer volume;
        private Float titrage;
}`}
                                </code>
                            </pre>

                            <ul className="clean-list">
                                <li>
                                    <strong>id</strong> : l’identifiant de l’article (clé primaire)
                                </li>
                                <li>
                                    <strong>nomArticle</strong> : le nom de l’article
                                </li>
                            </ul>
                        </section>

					{/* ===================== A2) Repository ===================== */}
					<h3>A2&#41; Repository (exemple : ArticleRepository)</h3>
					<p>
						<strong>Méthode :</strong> créer un repository Spring Data JPA pour{" "}
						<code>Article</code>.
					</p>
					<p>
						<strong>But :</strong> avoir directement les méthodes CRUD (ex :{" "}
						<code>findAll()</code>, <code>findById()</code>) sans écrire de SQL.
					</p>
					<p>
						<strong>Fonctionnement :</strong> Spring génère l’implémentation
						automatiquement à partir de <code>JpaRepository</code>.
					</p>

					<pre className="code">
						<code>
							{`
package com.dv.sdbmserver.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.dv.sdbmserver.Entities.Article;

public interface ArticleRepository extends JpaRepository<Article, Integer> {
}`}
						</code>
					</pre>

					{/* =========================
                        A3) Service — READ (ArticleService)
                    ========================= */}
                    <section className="chapter-section" id="a3-service-read">
                        <h2 className="section-title">A3) Service — READ (exemple : ArticleService)</h2>

                        <p>
                            Règles importantes :
                        </p>

                        <ul className="clean-list">
                            <li>
                                <code>findAll()</code> → renvoie une liste
                            </li>
                            <li>
                                <code>findById(id)</code> → renvoie soit l’objet, soit une erreur si introuvable
                            </li>
                        </ul>

                        <div className="chapter-callout">
                            <p>
                                <strong>Objectif :</strong> créer/compléter{" "}
                                <code>ArticleService.java</code> dans{" "}
                                <code>src/main/java/com/dv/sdbmserver/Services/</code>.
                            </p>
                        </div>

                        {/* ===== Version 1 ===== */}
                        <h3 className="section-subtitle">Version 1 — simple (RuntimeException)</h3>

                        <pre className="code">
                            <code>{`
package com.dv.sdbmserver.Services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.dv.sdbmserver.Dto.ArticleDto;
import com.dv.sdbmserver.Entities.Article;
import com.dv.sdbmserver.Repositories.ArticleRepository;

@Service
public class ArticleService {

	private final ArticleRepository articleRepository;

	public ArticleService(ArticleRepository articleRepository) {
		this.articleRepository = articleRepository;
	}

	public List<ArticleDto> findAll() {
		return articleRepository.findAll()
			.stream()
			.map(this::toDto)
			.collect(Collectors.toList());
	}

	// Fonction findById qui renvoie soit l'objet correspondant, soit une erreur si introuvable
	public ArticleDto findById(Integer id) {
		// On demande au repository de chercher un Article par son ID (clé primaire).
		// findById(id) renvoie un Optional<Article> :
		// - soit l'article existe => Optional contient l'Article
		// - soit il n'existe pas => Optional est vide
		Article article = articleRepository.findById(id)
			// Si l'Optional est vide (aucun article trouvé), on déclenche une exception.
			// Ici : RuntimeException (ça renvoie souvent une erreur 500 côté API).
			.orElseThrow(() -> new RuntimeException("Article introuvable (id=" + id + ")"));

		// Si on arrive ici, l'article existe : on le convertit en DTO pour renvoyer un JSON propre.
		return toDto(article);
	}

	private ArticleDto toDto(Article article) {
		ArticleDto dto = new ArticleDto();
		dto.setId(article.getId());
		dto.setNomArticle(article.getNomArticle());
		return dto;
	}
}`}
                        </code>
                            </pre>

                            <p>
                                Remarque : cette version est OK pour apprendre, mais en REST ce n’est pas idéal
                                car une <code>RuntimeException</code> renvoie souvent une erreur <strong>500</strong>.
                            </p>

                            {/* ===== Version 2 ===== */}
                            <h3 className="section-subtitle">Version 2 — propre (HTTP 404 avec ResponseStatusException)</h3>

                            <pre className="code">
                                <code>
                                    {`
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

// ...

public ArticleDto findById(Integer id) {
	Article article = articleRepository.findById(id)
		// MODIF 1 : on remplace la RuntimeException par une ResponseStatusException
		// => Spring renverra une vraie réponse HTTP (ici 404) au lieu d'une erreur 500.
		.orElseThrow(() -> new ResponseStatusException(
			// MODIF 2 : statut HTTP retourné au client
			HttpStatus.NOT_FOUND,
			// MODIF 3 : message plus lisible (String template)
			"Article introuvable (id=%s)".formatted(id)
		));

	// Identique à la version 1 : on convertit l'entité Article en DTO avant de renvoyer la réponse.
	return toDto(article);}`}
                            </code>
                        </pre>

                        <ul className="clean-list">
                            <li>
                                <strong>Avantage :</strong> si l’article n’existe pas, ton API répond{" "}
                                <strong>404 Not Found</strong> (plus logique côté front/Postman).
                            </li>
                        </ul>
                    </section>

					{/* =========================
                        A4) Controller — READ (ArticleController)
                    ========================= */}
                    <section className="chapter-section" id="a4-controller-read">
                        <h2 className="section-title">A4&#41; Controller — READ (exemple : ArticleController)</h2>

                        <p>
                            Deux endpoints de base :
                        </p>

                        <ul className="clean-list">
                            <li>
                                <code>GET /articles</code> → liste
                            </li>
                            <li>
                                <code>GET /articles/article/{`{id}`}</code> → détail
                            </li>
                        </ul>

                        <div className="chapter-callout">
                            <p>
                                <strong>Objectif :</strong> créer{" "}
                                <code>ArticleController.java</code> dans{" "}
                                <code>src/main/java/com/dv/sdbmserver/Controller/</code>.
                            </p>
                        </div>

                        <h3 className="section-subtitle">Code : ArticleController.java</h3>

                        <pre className="code">
                            <code>
                                {`
package com.dv.sdbmserver.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dv.sdbmserver.Dto.ArticleDto;
import com.dv.sdbmserver.Services.ArticleService;

@RestController
@RequestMapping("/articles")
public class ArticleController {

	private final ArticleService articleService;

	public ArticleController(ArticleService articleService) {
		this.articleService = articleService;
	}

	// GET http://localhost:8081/articles
	// Renvoie une liste d'ArticleDto (pas l'entité)
	@GetMapping
	public List<ArticleDto> getAll() {
		return articleService.findAll();
	}

	// GET http://localhost:8081/articles/article/{id}
	@GetMapping("/article/{id}")
	public ArticleDto getById(@PathVariable Integer id) {
		return articleService.findById(id);
	}
}`}
                            </code>
                        </pre>

                        <p>
                            Tests :
                        </p>
                        <ul className="clean-list">
                            <li><code>http://localhost:8081/articles</code></li>
                            <li><code>http://localhost:8081/articles/article/6</code></li>
                        </ul>
                    </section>

					{/* ===================== A5) Tests ===================== */}
					<h3>A5&#41; Tests rapides</h3>
					<p>
						<strong>Méthode :</strong> tester tes endpoints dans le navigateur ou Postman.
					</p>
					<p>
						<strong>But :</strong> valider que Spring Boot + JPA + mapping + JSON sortent
						correctement.
					</p>
					<p>
						<strong>Fonctionnement :</strong> 500 : erreur serveur (regarde la console Spring Boot : une exception a été levée)
					</p>

					<ul className="clean-list">
						<li>
							Liste : <code>http://localhost:8081/articles</code>
						</li>
						<li>
							Détail : <code>http://localhost:8081/articles/1</code>
						</li>
					</ul>

					<p>
						Si tu obtiens une erreur :
					</p>
					<ul className="clean-list">
						<li>
							<strong>404</strong> : l’ID n’existe pas en base
						</li>
						<li>
							<strong>500</strong> : souvent une exception dans le service (on verra comment
							faire des erreurs propres)
						</li>
					</ul>
				</section>
                {/* =========================
                    B) CREATE
                ========================= */}
                <section className="chapter-section" id="B">
                    <h2 className="section-title">B&#41; CREATE — ajouter des données (POST)</h2>

                    <div className="chapter-callout">
                        <p>
                            Objectif : créer de nouveaux <code>Article</code> via l’API avec un <code>POST /articles</code>.
                            <br />
                            Principe : <strong>Controller</strong> reçoit la requête HTTP → <strong>Service</strong> valide/convertit →{" "}
                            <strong>Repository</strong> fait le <code>save()</code>.
                        </p>
                    </div>

                    {/* B1 */}
                    <div className="chapter-section" id="B1">
                        <h3 className="section-title">B1&#41; DTO d’entrée — ArticleCreateDto</h3>
                        <p>DTO dédié à la création (entrée), pour éviter d’envoyer l’entité JPA.</p>

                        <pre className="code">
                            <code>{`package com.dv.sdbmserver.Dto;

                import java.math.BigDecimal;

                import lombok.Getter;
                import lombok.Setter;

                @Getter
                @Setter
                public class ArticleCreateDto {

                    // Champs "métier"
                    private String nomArticle;
                    private BigDecimal prixAchat;
                    private Integer volume;
                    private Float titrage;

                    // Relations (FK) : on envoie les IDs
                    private Integer idMarque;
                    private Integer idCouleur;   // optionnel
                    private Integer idTypeBiere; // optionnel
                }`}</code>
                        </pre>
                    </div>

                    {/* B2 */}
                    <div className="chapter-section" id="B2">
                        <h3 className="section-title">B2&#41; Service — ArticleCreateService</h3>

                        <pre className="code">
                            <code>{`package com.dv.sdbmserver.Services;

                import java.util.Objects;

                import org.springframework.http.HttpStatus;
                import org.springframework.stereotype.Service;
                import org.springframework.web.server.ResponseStatusException;

                import com.dv.sdbmserver.Dto.ArticleCreateDto;
                import com.dv.sdbmserver.Dto.ArticleDto;
                import com.dv.sdbmserver.Entities.Article;
                import com.dv.sdbmserver.Entities.Couleur;
                import com.dv.sdbmserver.Entities.Marque;
                import com.dv.sdbmserver.Entities.TypeBiere;
                import com.dv.sdbmserver.Repositories.ArticleRepository;
                import com.dv.sdbmserver.Repositories.CouleurRepository;
                import com.dv.sdbmserver.Repositories.MarqueRepository;
                import com.dv.sdbmserver.Repositories.TypeBiereRepository;

                @Service
                public class ArticleCreateService {

                    private final ArticleRepository articleRepository;
                    private final MarqueRepository marqueRepository;
                    private final CouleurRepository couleurRepository;
                    private final TypeBiereRepository typeBiereRepository;

                    public ArticleCreateService(
                        ArticleRepository articleRepository,
                        MarqueRepository marqueRepository,
                        CouleurRepository couleurRepository,
                        TypeBiereRepository typeBiereRepository
                    ) {
                        this.articleRepository = articleRepository;
                        this.marqueRepository = marqueRepository;
                        this.couleurRepository = couleurRepository;
                        this.typeBiereRepository = typeBiereRepository;
                    }

                    public ArticleDto create(ArticleCreateDto createDto) {

                        if (createDto == null) {
                            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Body JSON manquant");
                        }

                        if (createDto.getNomArticle() == null || createDto.getNomArticle().isBlank()) {
                            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "nomArticle est obligatoire");
                        }

                        if (createDto.getIdMarque() == null) {
                            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "idMarque est obligatoire");
                        }

                        // ===== 1) Charger les relations depuis les IDs =====

                        Marque marque = marqueRepository.findById(createDto.getIdMarque())
                            .orElseThrow(() -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Marque introuvable (id=%s)".formatted(createDto.getIdMarque())
                            ));

                        Couleur couleur = null;
                        if (createDto.getIdCouleur() != null) {
                            couleur = couleurRepository.findById(createDto.getIdCouleur())
                                .orElseThrow(() -> new ResponseStatusException(
                                    HttpStatus.NOT_FOUND,
                                    "Couleur introuvable (id=%s)".formatted(createDto.getIdCouleur())
                                ));
                        }

                        TypeBiere type = null;
                        if (createDto.getIdTypeBiere() != null) {
                            type = typeBiereRepository.findById(createDto.getIdTypeBiere())
                                .orElseThrow(() -> new ResponseStatusException(
                                    HttpStatus.NOT_FOUND,
                                    "TypeBiere introuvable (id=%s)".formatted(createDto.getIdTypeBiere())
                                ));
                        }

                        // ===== 2) Construire l'entité Article =====
                        Article article = new Article();

                        article.setNomArticle(createDto.getNomArticle());
                        article.setPrixAchat(createDto.getPrixAchat());
                        article.setVolume(createDto.getVolume());
                        article.setTitrage(createDto.getTitrage());

                        article.setMarque(marque);
                        article.setIdCouleur(couleur);
                        article.setIdType(type);

                        // ===== 3) Save =====
                        Article saved = articleRepository.save(article);

                        // ===== 4) Retour DTO =====
                        return toDto(saved);
                    }

                    private ArticleDto toDto(Article article) {
                        Objects.requireNonNull(article);

                        ArticleDto dto = new ArticleDto();

                        dto.setId(article.getId());
                        dto.setNomArticle(article.getNomArticle());
                        dto.setPrixAchat(article.getPrixAchat() != null ? article.getPrixAchat().toString() : null);
                        dto.setVolume(article.getVolume());
                        dto.setTitrage(article.getTitrage());

                        dto.setIdMarque(article.getMarque() != null ? article.getMarque().getId() : null);
                        dto.setIdCouleur(article.getIdCouleur() != null ? article.getIdCouleur().getId() : null);
                        dto.setIdTypeBiere(article.getIdType() != null ? article.getIdType().getIdTypeBiere() : null);

                        return dto;
                    }
                }`}</code>
                        </pre>
                    </div>

                    {/* B3 */}
                    <div className="chapter-section" id="B3">
                        <h3 className="section-title">B3&#41; Controller — ArticleController (POST /articles)</h3>

                        <pre className="code">
                            <code>{`package com.dv.sdbmserver.Controller;

                import java.util.List;

                import org.springframework.web.bind.annotation.GetMapping;
                import org.springframework.web.bind.annotation.PathVariable;
                import org.springframework.web.bind.annotation.PostMapping;
                import org.springframework.web.bind.annotation.RequestBody;
                import org.springframework.web.bind.annotation.RequestMapping;
                import org.springframework.web.bind.annotation.RestController;

                import com.dv.sdbmserver.Dto.ArticleCreateDto;
                import com.dv.sdbmserver.Dto.ArticleDto;
                import com.dv.sdbmserver.Services.ArticleCreateService;
                import com.dv.sdbmserver.Services.ArticleService;

                @RestController
                @RequestMapping("/articles")
                public class ArticleController {

                    private final ArticleService articleService;
                    private final ArticleCreateService articleCreateService;

                    public ArticleController(ArticleService articleService, ArticleCreateService articleCreateService) {
                        this.articleService = articleService;
                        this.articleCreateService = articleCreateService;
                    }

                    @GetMapping
                    public List<ArticleDto> getAll() {
                        return articleService.findAll();
                    }

                    @GetMapping("/article/{id}")
                    public ArticleDto getById(@PathVariable Integer id) {
                        return articleService.findById(id);
                    }

                    @PostMapping
                    public ArticleDto create(@RequestBody ArticleCreateDto createDto) {
                        return articleCreateService.create(createDto);
                    }
                }`}</code>
                        </pre>
                    </div>

                    {/* B4 */}
                    <div className="chapter-section" id="B4">
                        <h3 className="section-title">B4&#41; Test rapide (Postman)</h3>

                        <ul className="clean-list">
                            <li>
                                URL : <code>POST http://localhost:8081/articles</code>
                            </li>
                            <li>
                                Header : <code>Content-Type: application/json</code>
                            </li>
                        </ul>

                        <pre className="code">
                            <code>{`{
                "nomArticle": "Article test",
                "prixAchat": 2.50,
                "volume": 33,
                "titrage": 5.5,
                "idMarque": 1,
                "idCouleur": null,
                "idTypeBiere": null
                }`}</code>
                        </pre>

                        <p>
                            Résultats possibles : <code>201/200</code> = OK, <code>400</code> = champ manquant/JSON invalide,{" "}
                            <code>404</code> = FK introuvable (ex: marque inexistante).
                        </p>
                    </div>
                </section>
                {/* =========================
                    C) UPDATE
                ========================= */}
                <section className="chapter-section" id="C">
                    <h2 className="section-title">C) UPDATE — modifier des données (PUT)</h2>

                    <div className="chapter-callout">
                        <p>
                            Objectif : modifier un <code>Article</code> existant via l’API.
                            <br />
                            Principe : <strong>Controller</strong> reçoit la requête HTTP (PUT) → <strong>Service</strong> charge l’article,
                            met à jour les champs + relations, puis <code>save()</code>.
                        </p>
                    </div>

                    {/* C1 */}
                    <div className="chapter-section" id="C1">
                        <h3 className="section-title">C1&#41; DTO d’entrée — ArticleUpdateDto</h3>
                        <p>
                            On crée un DTO dédié à la modification. Ici on autorise les champs à être <code>null</code> pour pouvoir faire
                            des mises à jour partielles.
                        </p>

                        <pre className="code">
                            <code>{`
                package com.dv.sdbmserver.Dto;

                import java.math.BigDecimal;

                import lombok.Getter;
                import lombok.Setter;

                @Getter
                @Setter
                public class ArticleUpdateDto {

                    // Champs "métier" (optionnels)
                    private String nomArticle;
                    private BigDecimal prixAchat;
                    private Integer volume;
                    private Float titrage;

                    // Relations (IDs optionnels)
                    private Integer idMarque;
                    private Integer idCouleur;
                    private Integer idTypeBiere;
                }`}
                            </code>
                        </pre>
                    </div>

                    {/* C2 */}
                    <div className="chapter-section" id="C2">
                        <h3 className="section-title">C2&#41; Service — ArticleUpdateService</h3>

                        <pre className="code">
                            <code>{`
                package com.dv.sdbmserver.Services;

                import java.util.Objects;

                import org.springframework.http.HttpStatus;
                import org.springframework.stereotype.Service;
                import org.springframework.web.server.ResponseStatusException;

                import com.dv.sdbmserver.Dto.ArticleDto;
                import com.dv.sdbmserver.Dto.ArticleUpdateDto;
                import com.dv.sdbmserver.Entities.Article;
                import com.dv.sdbmserver.Entities.Couleur;
                import com.dv.sdbmserver.Entities.Marque;
                import com.dv.sdbmserver.Entities.TypeBiere;
                import com.dv.sdbmserver.Repositories.ArticleRepository;
                import com.dv.sdbmserver.Repositories.CouleurRepository;
                import com.dv.sdbmserver.Repositories.MarqueRepository;
                import com.dv.sdbmserver.Repositories.TypeBiereRepository;

                @Service
                public class ArticleUpdateService {

                    private final ArticleRepository articleRepository;
                    private final MarqueRepository marqueRepository;
                    private final CouleurRepository couleurRepository;
                    private final TypeBiereRepository typeBiereRepository;

                    public ArticleUpdateService(
                        ArticleRepository articleRepository,
                        MarqueRepository marqueRepository,
                        CouleurRepository couleurRepository,
                        TypeBiereRepository typeBiereRepository
                    ) {
                        this.articleRepository = articleRepository;
                        this.marqueRepository = marqueRepository;
                        this.couleurRepository = couleurRepository;
                        this.typeBiereRepository = typeBiereRepository;
                    }

                    public ArticleDto update(Integer id, ArticleUpdateDto updateDto) {

                        if (updateDto == null) {
                            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Body JSON manquant");
                        }

                        // 1) Charger l'article à modifier
                        Article article = articleRepository.findById(id)
                            .orElseThrow(() -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Article introuvable (id=%s)".formatted(id)
                            ));

                        // 2) Mettre à jour les champs simples (si fournis)
                        if (updateDto.getNomArticle() != null) {
                            if (updateDto.getNomArticle().isBlank()) {
                                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "nomArticle ne peut pas être vide");
                            }
                            article.setNomArticle(updateDto.getNomArticle());
                        }

                        if (updateDto.getPrixAchat() != null) {
                            article.setPrixAchat(updateDto.getPrixAchat());
                        }

                        if (updateDto.getVolume() != null) {
                            article.setVolume(updateDto.getVolume());
                        }

                        if (updateDto.getTitrage() != null) {
                            article.setTitrage(updateDto.getTitrage());
                        }

                        // 3) Mettre à jour les relations (si IDs fournis)
                        if (updateDto.getIdMarque() != null) {
                            Marque marque = marqueRepository.findById(updateDto.getIdMarque())
                                .orElseThrow(() -> new ResponseStatusException(
                                    HttpStatus.NOT_FOUND,
                                    "Marque introuvable (id=%s)".formatted(updateDto.getIdMarque())
                                ));
                            article.setMarque(marque);
                        }

                        // Couleur : on autorise la suppression de la relation en envoyant null explicitement
                        // => pour différencier "pas fourni" et "je veux vider", on peut utiliser un champ bool
                        // ou un DTO plus avancé. Ici : si idCouleur est fourni, on applique.
                        if (updateDto.getIdCouleur() != null) {
                            Couleur couleur = couleurRepository.findById(updateDto.getIdCouleur())
                                .orElseThrow(() -> new ResponseStatusException(
                                    HttpStatus.NOT_FOUND,
                                    "Couleur introuvable (id=%s)".formatted(updateDto.getIdCouleur())
                                ));
                            article.setIdCouleur(couleur);
                        }

                        if (updateDto.getIdTypeBiere() != null) {
                            TypeBiere type = typeBiereRepository.findById(updateDto.getIdTypeBiere())
                                .orElseThrow(() -> new ResponseStatusException(
                                    HttpStatus.NOT_FOUND,
                                    "TypeBiere introuvable (id=%s)".formatted(updateDto.getIdTypeBiere())
                                ));
                            article.setIdType(type);
                        }

                        // 4) Save + retour DTO
                        Article saved = articleRepository.save(article);
                        return toDto(saved);
                    }

                    private ArticleDto toDto(Article article) {
                        Objects.requireNonNull(article);

                        ArticleDto dto = new ArticleDto();

                        dto.setId(article.getId());
                        dto.setNomArticle(article.getNomArticle());
                        dto.setPrixAchat(article.getPrixAchat() != null ? article.getPrixAchat().toString() : null);
                        dto.setVolume(article.getVolume());
                        dto.setTitrage(article.getTitrage());

                        dto.setIdMarque(article.getMarque() != null ? article.getMarque().getId() : null);
                        dto.setIdCouleur(article.getIdCouleur() != null ? article.getIdCouleur().getId() : null);
                        dto.setIdTypeBiere(article.getIdType() != null ? article.getIdType().getIdTypeBiere() : null);

                        return dto;
                    }
                }`} 
                            </code>
                        </pre>
                    </div>

                    {/* C3 */}
                    <div className="chapter-section" id="C3">
                        <h3 className="section-title">C3&#41; Controller — PUT /articles/article/{'{'}id{'}'}</h3>

                        <pre className="code">
                            <code>{`
                package com.dv.sdbmserver.Controller;

                import java.util.List;

                import org.springframework.web.bind.annotation.GetMapping;
                import org.springframework.web.bind.annotation.PathVariable;
                import org.springframework.web.bind.annotation.PostMapping;
                import org.springframework.web.bind.annotation.PutMapping;
                import org.springframework.web.bind.annotation.RequestBody;
                import org.springframework.web.bind.annotation.RequestMapping;
                import org.springframework.web.bind.annotation.RestController;

                import com.dv.sdbmserver.Dto.ArticleCreateDto;
                import com.dv.sdbmserver.Dto.ArticleDto;
                import com.dv.sdbmserver.Dto.ArticleUpdateDto;
                import com.dv.sdbmserver.Services.ArticleCreateService;
                import com.dv.sdbmserver.Services.ArticleService;
                import com.dv.sdbmserver.Services.ArticleUpdateService;

                @RestController
                @RequestMapping("/articles")
                public class ArticleController {

                    private final ArticleService articleService;
                    private final ArticleCreateService articleCreateService;
                    private final ArticleUpdateService articleUpdateService;

                    public ArticleController(
                        ArticleService articleService,
                        ArticleCreateService articleCreateService,
                        ArticleUpdateService articleUpdateService
                    ) {
                        this.articleService = articleService;
                        this.articleCreateService = articleCreateService;
                        this.articleUpdateService = articleUpdateService;
                    }

                    @GetMapping
                    public List<ArticleDto> getAll() {
                        return articleService.findAll();
                    }

                    @GetMapping("/article/{id}")
                    public ArticleDto getById(@PathVariable Integer id) {
                        return articleService.findById(id);
                    }

                    @PostMapping
                    public ArticleDto create(@RequestBody ArticleCreateDto createDto) {
                        return articleCreateService.create(createDto);
                    }

                    // PUT http://localhost:8081/articles/article/3926
                    @PutMapping("/article/{id}")
                    public ArticleDto update(@PathVariable Integer id, @RequestBody ArticleUpdateDto updateDto) {
                        return articleUpdateService.update(id, updateDto);
                    }
                }`}
                            </code>
                        </pre>
                    </div>

                    {/* C4 */}
                    <div className="chapter-section" id="C4">
                        <h3 className="section-title">C4&#41; Test rapide (Postman)</h3>

                        <ul className="clean-list">
                            <li>
                                URL : <code>PUT http://localhost:8081/articles/article/3926</code>
                            </li>
                            <li>
                                Header : <code>Content-Type: application/json</code>
                            </li>
                        </ul>

                        <p>Exemple : modifier seulement le nom + volume :</p>
                        <pre className="code">
                            <code>{`{
                "nomArticle": "Article modifié",
                "volume": 50
                }`}</code>
                        </pre>

                        <p>Exemple : modifier la marque (FK) :</p>
                        <pre className="code">
                            <code>{`{
                "idMarque": 2
                }`}</code>
                        </pre>
                    </div>
                </section>
			</div>

			<div className="chapter-navigation">
				<Link className="btn-prev" to="/coursEtTutos/java_sdbm/creation-des-autres-entites">
					← Précédent
				</Link>

				<Link className="btn-next" to="/coursEtTutos/java_sdbm/validation-gestion-erreurs">
					Suivant → Chapitre 06
				</Link>
			</div>
		</main>
	);
}