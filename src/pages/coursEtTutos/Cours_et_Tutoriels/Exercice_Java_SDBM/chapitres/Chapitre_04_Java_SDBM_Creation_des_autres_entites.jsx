import React from "react";
import { Link } from "react-router-dom";
import "./Chapitre_Java_SDBM.css";

export default function Chapitre_04_Java_SDBM_Creation_Autres_Entites() {
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
					Chapitre 04 — Création des autres entités (Repository + DTO + Service + Controller)
				</h1>
				<p className="chapter-subtitle">
					Objectif : créer les autres entités de ton MCD (autres que <code>Continent</code> et{" "}
					<code>Pays</code>) et comprendre les cas plus “compliqués” : plusieurs champs, relations, DTO, services,
					controllers.
				</p>
			</header>

			<div className="chapter-card">
				<section className="chapter-section">
					<h2 className="section-title">A) Méthode (toujours la même)</h2>
					<p>
						<strong>Méthode :</strong> on suit toujours le même “pipeline” pour construire une entité propre dans une
						API Spring Boot : <em>Entity → Repository → DTO → Service → Controller</em>.
					</p>
					<p>
						<strong>But :</strong> séparer clairement les responsabilités (mapping DB, accès aux données, format de
						réponse, logique métier, endpoints HTTP) pour éviter un code “mélangé” et difficile à maintenir.
					</p>
					<p>
						<strong>Fonctionnement :</strong> l’Entity mappe la table, le Repository donne le CRUD, le DTO définit ce
						qu’on renvoie (ou reçoit) à l’API, le Service orchestre (règles + conversions), et le Controller expose
						les routes.
					</p>
					<ol className="clean-list">
						<li>
							<strong>Entity</strong> (<code>src/main/java/.../Entities/...</code>)
						</li>
						<li>
							<strong>Repository</strong> (<code>.../Repositories/...Repository.java</code>)
						</li>
						<li>
							<strong>DTO</strong> (souvent un DTO sortant + un DTO entrant)
						</li>
						<li>
							<strong>Service</strong> (logique + conversions)
						</li>
						<li>
							<strong>Controller</strong> (endpoints HTTP)
						</li>
					</ol>
				</section>

				<section className="chapter-section">
					<h2 className="section-title">B) Entités “référentielles” (sans relation)</h2>
					<p>
						<strong>Méthode :</strong> on commence par les entités simples (souvent des tables “référentielles”) qui
						ne dépendent pas d’autres tables (ou très peu).
					</p>
					<p>
						<strong>But :</strong> sécuriser la base du projet : si <code>Article</code> référence ces tables via des
						FK, tu veux que ces entités soient OK avant de construire <code>Article</code> (sinon tu te perds dans
						les erreurs).
					</p>
					<p>
						<strong>Fonctionnement :</strong> chaque entité correspond à une table, puis on expose un endpoint simple
						(liste) pour vérifier que la connexion DB + JPA + sérialisation fonctionnent.
					</p>
					<p>
						On commence par ces entités “référentielles” car <code>Article</code> va les référencer via des clés
						étrangères :
					</p>
					<ul className="clean-list">
						<li>
							<code>Marque</code>
						</li>
						<li>
							<code>Couleur</code>
						</li>
						<li>
							<code>TypeBiere</code>
						</li>
						<li>
							<code>Fabricant</code>
						</li>
					</ul>

					{/* ===================== B1) MARQUE ===================== */}
					<h3>B1) Entité SANS relation : Marque</h3>
					<p>
						<strong>Méthode :</strong> entité simple (2 colonnes principales) + CRUD via <code>JpaRepository</code>,
						puis DTO et service de conversion.
					</p>
					<p>
						<strong>But :</strong> valider le mapping JPA d’une table “référence” et fournir un endpoint stable que{" "}
						<code>Article</code> pourra utiliser indirectement (via FK).
					</p>
					<p>
						<strong>Fonctionnement :</strong> le controller appelle le service, le service appelle le repository, le
						repository lit la DB, et on renvoie une liste de DTO (pas l’entité complète).
					</p>

					<h4>1) Entity</h4>
					<pre className="code">
						<code>
							{`package com.dv.sdbmserver.Entities;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "marque")
@Getter
@Setter
@NoArgsConstructor
public class Marque {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_MARQUE")
	private Integer id;

	@Column(name = "NOM_MARQUE", nullable = false, length = 60)
	private String nomMarque;
}`}
						</code>
					</pre>

					<h4>2) Repository</h4>
					<pre className="code">
						<code>
							{`package com.dv.sdbmserver.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.dv.sdbmserver.Entities.Marque;

public interface MarqueRepository extends JpaRepository<Marque, Integer> { }`}
						</code>
					</pre>

					<h4>3) DTO</h4>
					<pre className="code">
						<code>
							{`package com.dv.sdbmserver.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MarqueDto {
	private Integer id;
	private String nomMarque;
}`}
						</code>
					</pre>

					<h4>4) Service</h4>
					<pre className="code">
						<code>
							{`package com.dv.sdbmserver.Services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.dv.sdbmserver.Dto.MarqueDto;
import com.dv.sdbmserver.Entities.Marque;
import com.dv.sdbmserver.Repositories.MarqueRepository;

@Service
public class MarqueService {

	private final MarqueRepository marqueRepository;

	public MarqueService(MarqueRepository marqueRepository) {
		this.marqueRepository = marqueRepository;
	}

	public List<MarqueDto> findAll() {
		return marqueRepository.findAll()
			.stream()
			.map(this::toDto)
			.collect(Collectors.toList());
	}

	private MarqueDto toDto(Marque marque) {
		MarqueDto dto = new MarqueDto();
		dto.setId(marque.getId());
		dto.setNomMarque(marque.getNomMarque());
		return dto;
	}
}`}
						</code>
					</pre>

					<h4>5) Controller</h4>
					<pre className="code">
						<code>
							{`package com.dv.sdbmserver.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dv.sdbmserver.Dto.MarqueDto;
import com.dv.sdbmserver.Services.MarqueService;

@RestController
@RequestMapping("/marques")
public class MarqueController {

	private final MarqueService marqueService;

	public MarqueController(MarqueService marqueService) {
		this.marqueService = marqueService;
	}

	@GetMapping
	public List<MarqueDto> getAll() {
		return marqueService.findAll();
	}
}`}
						</code>
					</pre>

					<p className="chapter-callout">
						Test : <code>http://localhost:8081/marques</code>
					</p>

					{/* Le reste de ton Chapitre 04 continue ici exactement comme tu l’avais */}
				</section>

				{/* ... tout le reste de ton contenu Chapitre 04 ... */}
			</div>

			<div className="chapter-navigation">
				<Link className="btn-prev" to="/coursEtTutos/java_sdbm/relations-jpa">
					← Précédent
				</Link>

				<Link className="btn-next" to="/coursEtTutos/java_sdbm/creation-crud">
					Suivant → Chapitre 05
				</Link>
			</div>
		</main>
	);
}