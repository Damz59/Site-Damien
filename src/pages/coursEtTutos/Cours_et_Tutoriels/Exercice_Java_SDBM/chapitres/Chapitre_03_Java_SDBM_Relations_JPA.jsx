import { Link } from "react-router-dom";
import "./Chapitre_Java_SDBM.css";

export default function Chapitre_03_Java_SDBM_Relations_JPA() {
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

			{/* Header du chapitre */}
			<header className="chapter-header">
				<h1 className="chapter-title">
					Chapitre 03 — Relations JPA (Continent → Pays)
				</h1>
				<p className="chapter-subtitle">
					Objectif : créer une relation <strong>1→N / N→1</strong> avec JPA/Hibernate
					et éviter les <strong>boucles JSON</strong> lors des tests HTTP.
				</p>
			</header>

			{/* Card principale */}
			<div className="chapter-card">
				<section className="chapter-section">
					<h2 className="section-title">A) Préparer la relation (rappel MCD)</h2>
					<p>
						Dans le MCD, un <strong>Continent</strong> contient plusieurs{" "}
						<strong>Pays</strong> :
					</p>
					<ul className="clean-list">
						<li>1 Continent → N Pays</li>
						<li>N Pays → 1 Continent</li>
					</ul>
					<p>
						En base, cela se traduit généralement par une clé étrangère dans la table{" "}
						<code>PAYS</code> :
					</p>
					<ul className="clean-list">
						<li>
							<code>PAYS.ID_CONTINENT</code> référence{" "}
							<code>CONTINENT.ID_CONTINENT</code>
						</li>
					</ul>
				</section>

				<section className="chapter-section">
					<h2 className="section-title">
						B) Exemple vierge (squelette) — relation 1→N / N→1
					</h2>
					<div className="chapter-callout">
						Idée : on met <code>@ManyToOne</code> du côté de la table qui porte la
						FK (souvent le côté “N”), et <code>@OneToMany</code> de l’autre côté.
					</div>
					<pre className="code">
						<code>
							{`// Côté N (ex: Pays)
@ManyToOne
@JoinColumn(name = "ID_CONTINENT")
private Continent continent;

// Côté 1 (ex: Continent)
@OneToMany(mappedBy = "continent")
private List<Pays> pays;`}
						</code>
					</pre>
				</section>

				<section className="chapter-section">
					<h2 className="section-title">C) Créer l’entité Pays (exemple concret)</h2>
					<p>
						Crée : <code>src/main/java/com/dv/sdbmserver/Entities/Pays.java</code>
					</p>
					<pre className="code">
						<code>
							{`package com.dv.sdbmserver.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "PAYS")
@Getter
@Setter
@NoArgsConstructor
public class Pays {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_PAYS")
	private Integer idPays;

	@Column(name = "NOM_PAYS", nullable = false, length = 255)
	private String nomPays;

	// Côté N -> référence vers le Continent (FK dans PAYS)
	@ManyToOne
	@JoinColumn(name = "ID_CONTINENT", nullable = false)
	private Continent continent;
}`}
						</code>
					</pre>
				</section>

				<section className="chapter-section">
					<h2 className="section-title">
						D) Mettre à jour Continent (ajouter la liste des pays)
					</h2>
					<p>
						Dans <code>Continent.java</code>, ajoute la liste. Attention à la boucle
						JSON lors des tests : pour un premier test rapide, on utilise{" "}
						<code>@JsonIgnore</code>.
					</p>
					<pre className="code">
						<code>
							{`import java.util.List;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonIgnore;

// ...

@OneToMany(mappedBy = "continent")
@JsonIgnore // évite la boucle JSON (Continent -> Pays -> Continent -> ...)
private List<Pays> pays = new ArrayList<>();`}
						</code>
					</pre>

					<div className="chapter-callout">
						<strong>Remarque :</strong> en API REST, la solution la plus “propre”
						est de renvoyer des <strong>DTO</strong>. Ici, <code>@JsonIgnore</code>{" "}
						est une solution simple pour comprendre le problème.
					</div>
				</section>

				<section className="chapter-section">
					<h2 className="section-title">E) Repository PaysRepository</h2>
					<p>
						Crée :{" "}
						<code>
							src/main/java/com/dv/sdbmserver/Repositories/PaysRepository.java
						</code>
					</p>
					<pre className="code">
						<code>
							{`package com.dv.sdbmserver.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.dv.sdbmserver.Entities.Pays;

public interface PaysRepository extends JpaRepository<Pays, Integer> {
}`}
						</code>
					</pre>
				</section>

				<section className="chapter-section">
					<h2 className="section-title">F) Service PaysService (Option recommandé)</h2>
					<p>
						Crée : <code>src/main/java/com/dv/sdbmserver/Services/PaysService.java</code>
					</p>
				</section>

				<section className="chapter-section">
					<h2 className="section-title">G) Test HTTP rapide : lister les pays</h2>
					<p>
						Crée : <code>src/main/java/com/dv/sdbmserver/Controller/PaysController.java</code>
					</p>

					<pre className="code">
						<code>
							{`package com.dv.sdbmserver.Services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.dv.sdbmserver.Dto.PaysDto;
import com.dv.sdbmserver.Entities.Pays;
import com.dv.sdbmserver.Repositories.PaysRepository;

@Service
public class PaysService {

	private final PaysRepository paysRepository;

	public PaysService(PaysRepository paysRepository) {
		this.paysRepository = paysRepository;
	}

	public List<PaysDto> findAll() {
		return paysRepository.findAll()
			.stream()
			.map(this::toDto)
			.collect(Collectors.toList());
	}

	private PaysDto toDto(Pays pays) {
		PaysDto dto = new PaysDto();
		dto.setIdPays(pays.getIdPays());
		dto.setNomPays(pays.getNomPays());
		// Si ton Pays a : private Continent continent;
		// dto.setIdContinent(pays.getContinent().getIdContinent());
		return dto;
	}
}`}
						</code>
					</pre>

					<pre className="code">
						<code>
							{`package com.dv.sdbmserver.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dv.sdbmserver.Dto.PaysDto;
import com.dv.sdbmserver.Services.PaysService;

@RestController
@RequestMapping("/pays")
public class PaysController {

	private final PaysService paysService;

	public PaysController(PaysService paysService) {
		this.paysService = paysService;
	}

	@GetMapping
	public List<PaysDto> getAllPays() {
		return paysService.findAll();
	}
}`}
						</code>
					</pre>

					<div className="chapter-callout">
						Test : <code>http://localhost:8081/pays</code>
					</div>
				</section>

				<section className="chapter-section">
					<h2 className="section-title">
						H) Problème classique : boucles JSON (infinite recursion)
					</h2>
					<p>
						Si tu exposes <code>Continent.pays</code> <strong>et</strong>{" "}
						<code>Pays.continent</code> en même temps, Jackson peut boucler.
					</p>
					<p>Solutions possibles :</p>
					<ul className="clean-list">
						<li>
							<strong>DTO</strong> (recommandé)
						</li>
						<li>
							<code>@JsonIgnore</code> (simple)
						</li>
						<li>
							<code>@JsonManagedReference</code> / <code>@JsonBackReference</code>{" "}
							(possible aussi)
						</li>
					</ul>
				</section>
			</div>

			<div className="chapter-navigation">
				<Link className="btn-prev" to="/coursEtTutos/java_sdbm/creation-des-entites">
					← Précédent
				</Link>

				<Link
					className="btn-next"
					to="/coursEtTutos/java_sdbm/creation-des-autres-entites"
				>
					Suivant → Chapitre 04
				</Link>
			</div>
		</main>
	);
}