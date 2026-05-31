import "./Chapitre_Java_SDBM.css";

export default function Chapitre06_Java_SDBM() {
	return (
		<div className="page-content">
			{/* (Option) Logos si tu les utilises dans tous les chapitres */}
			{/*
			<div className="stack-logos">
				<img className="Java-logo" src={javaLogo} alt="Java" />
				<span className="logo-plus">+</span>
				<img className="Spring-logo" src={springLogo} alt="Spring" />
			</div>
			*/}

			<header className="chapter-header">
				<h1 className="chapter-title">Chapitre 06 — Validation + gestion d’erreurs</h1>
				<p className="chapter-subtitle">
					Objectif : validation automatique des DTO + réponses d’erreurs JSON propres (fini le Whitelabel).
				</p>
			</header>

			<main className="chapter-card">
				<section className="chapter-section" id="chapter-06">
					<h2 className="section-title">Validation + gestion d’erreurs (propre)</h2>

					<div className="chapter-callout">
						<ul className="clean-list">
							<li>Valider automatiquement les DTO (400 claires)</li>
							<li>Renvoyer des erreurs JSON propres (au lieu de Whitelabel / stacktrace)</li>
							<li>Garder un format d’erreur unique (facile à lire côté front/Postman)</li>
						</ul>
					</div>

					{/* A */}
					<section className="chapter-section" id="chapter-06-a">
						<h3>A) Ajouter la dépendance Validation</h3>

						<p>
							Si tu as généré le projet sans, ajoute dans ton <code>pom.xml</code> :
						</p>

						<pre className="code">
							<code>{`<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-validation</artifactId>
</dependency>`}</code>
						</pre>

						<p>Puis relance l’appli.</p>
					</section>

					{/* B */}
					<section className="chapter-section" id="chapter-06-b">
						<h3>B) Valider les DTO (Bean Validation)</h3>

						<p>
							Exemple sur <code>ArticleCreateDto</code> :
						</p>

						<pre className="code">
							<code>{`package com.dv.sdbmserver.Dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArticleCreateDto {

	@NotBlank(message = "nomArticle est obligatoire")
	private String nomArticle;

	@NotNull(message = "prixAchat est obligatoire")
	@Positive(message = "prixAchat doit être > 0")
	private BigDecimal prixAchat;

	@Positive(message = "volume doit être > 0")
	private Integer volume;

	@Positive(message = "titrage doit être > 0")
	private Float titrage;

	@NotNull(message = "idMarque est obligatoire")
	private Integer idMarque;

	private Integer idCouleur;
	private Integer idTypeBiere;
}`}</code>
						</pre>

						<p>
							Ensuite, dans ton controller, ajoute <code>@Valid</code> :
						</p>

						<pre className="code">
							<code>{`import jakarta.validation.Valid;

// ...

@PostMapping
public ArticleDto create(@Valid @RequestBody ArticleCreateDto createDto) {
	return articleCreateService.create(createDto);
}`}</code>
						</pre>

						<p>
							<strong>Résultat :</strong> si le JSON est invalide, Spring renvoie automatiquement une 400 (on la rend “jolie”
							au point D).
						</p>
					</section>

					{/* C */}
					<section className="chapter-section" id="chapter-06-c">
						<h3>C) Format d’erreur unique (JSON)</h3>

						<p>
							On crée un DTO de réponse d’erreur. <br />
							Crée : <code>src/main/java/com/dv/sdbmserver/Dto/ErrorResponse.java</code>
						</p>

						<pre className="code">
							<code>{`package com.dv.sdbmserver.Dto;

import java.time.Instant;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorResponse {
	private Instant timestamp;
	private int status;
	private String error;
	private String message;
	private String path;

	// optionnel : erreurs de validation champ par champ
	private Map<String, String> fieldErrors;
}`}</code>
						</pre>
					</section>

					{/* D */}
					<section className="chapter-section" id="chapter-06-d">
						<h3>D) Gestion globale des erreurs (RestControllerAdvice)</h3>

						<p>
							Crée : <code>src/main/java/com/dv/sdbmserver/Exceptions/GlobalExceptionHandler.java</code>
						</p>

						<pre className="code">
							<code>{`package com.dv.sdbmserver.Exceptions;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import com.dv.sdbmserver.Dto.ErrorResponse;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ResponseStatusException.class)
	public ResponseEntity<ErrorResponse> handleResponseStatusException(
		ResponseStatusException ex,
		HttpServletRequest request
	) {
		ErrorResponse body = new ErrorResponse();
		body.setTimestamp(Instant.now());
		body.setStatus(ex.getStatusCode().value());
		body.setError(ex.getStatusCode().toString());
		body.setMessage(ex.getReason());
		body.setPath(request.getRequestURI());

		return ResponseEntity.status(ex.getStatusCode()).body(body);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> handleValidation(
		MethodArgumentNotValidException ex,
		HttpServletRequest request
	) {
		Map<String, String> fieldErrors = new HashMap<>();
		ex.getBindingResult().getFieldErrors().forEach(err ->
			fieldErrors.put(err.getField(), err.getDefaultMessage())
		);

		ErrorResponse body = new ErrorResponse();
		body.setTimestamp(Instant.now());
		body.setStatus(400);
		body.setError("BAD_REQUEST");
		body.setMessage("Validation error");
		body.setPath(request.getRequestURI());
		body.setFieldErrors(fieldErrors);

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> handleGeneric(
		Exception ex,
		HttpServletRequest request
	) {
		ErrorResponse body = new ErrorResponse();
		body.setTimestamp(Instant.now());
		body.setStatus(500);
		body.setError("INTERNAL_SERVER_ERROR");
		body.setMessage("Erreur serveur (voir logs)");
		body.setPath(request.getRequestURI());

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
	}
}`}</code>
						</pre>
					</section>

					{/* E */}
					<section className="chapter-section" id="chapter-06-e">
						<h3>E&#41; Tests rapides (Postman)</h3>

						<p>1&#41; Test validation (400) :</p>
						<ul className="clean-list">
							<li>
								<code>POST http://localhost:8081/articles</code>
							</li>
							<li>Body :</li>
						</ul>

						<pre className="code">
							<code>{`{
	"nomArticle": "",
	"prixAchat": -2,
	"idMarque": null
}`}</code>
						</pre>

						<p>2&#41; Test 404 propre :</p>
						<ul className="clean-list">
							<li>
								<code>GET http://localhost:8081/articles/article/999999</code>
							</li>
						</ul>
					</section>

					{/* Navigation (option) */}
					{/*
					<nav className="chapter-navigation">
						<button className="btn-prev" disabled>← Précédent</button>
						<a className="btn-next" href="#chapter-07">Suivant →</a>
					</nav>
					*/}
				</section>
			</main>
		</div>
	);
}