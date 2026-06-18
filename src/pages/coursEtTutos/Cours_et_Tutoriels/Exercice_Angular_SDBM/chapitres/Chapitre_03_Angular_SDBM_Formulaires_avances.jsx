// src/pages/coursEtTutos/Cours_et_Tutoriels/Exercice_Angular_SDBM/chapitres/Chapitre_03_Angular_SDBM_Formulaires_avances.jsx

import { Container, Card, Badge } from "react-bootstrap"
import { Link } from "react-router-dom"

import Banniere from "../../../../../components/Banniere/Banniere.jsx"
import BanniereIsConnected from "../../../../../components/Banniere_isConnected/Banniere_isConnected.jsx"

// CSS global “chapitres Angular SDBM” (doit être dans le même dossier /chapitres)
import "./Chapitre_Angular_SDBM.css"

export default function Chapitre_03_Angular_SDBM_Formulaires_avances({ authUser }) {
	return (
		<main className="page-content flex-grow-1 overflow-auto">
			<Banniere />

			{authUser && (
				<div className="mt-3">
					<BanniereIsConnected authUser={authUser} />
				</div>
			)}

			<Container className="my-5">
				{/* Header / bannière */}
				<div className="chapter-header">
					<h1 className="chapter-title">
						Chapitre 03 — Formulaire avancé (selects Marque/Couleur/Type) + UX
					</h1>
					<p className="chapter-subtitle mb-0">
						Objectif : remplacer la saisie d’IDs par des listes déroulantes (référentiels) et
						améliorer l’expérience (loading/erreurs/validations).
					</p>
					<div className="mt-2">
						<Badge bg="light" text="dark">
							Angular
						</Badge>
					</div>
				</div>

				{/* Ce qu'on va faire */}
				<Card className="chapter-card shadow-sm mb-4">
					<Card.Body>
						<h2 className="section-title">Ce qu’on va faire</h2>
						<ul className="clean-list mb-0">
							<li>
								Utiliser les endpoints : <code>GET /marques</code>, <code>GET /couleurs</code>,{" "}
								<code>GET /types-biere</code>
							</li>
							<li>
								Dans Angular : charger les listes (ex: <code>forkJoin</code>) au démarrage du
								formulaire
							</li>
							<li>
								Remplacer <code>idMarque</code>/<code>idCouleur</code>/<code>idTypeBiere</code>{" "}
								par des <code>&lt;select&gt;</code>
							</li>
							<li>Gérer les états : loading + erreur de chargement des référentiels</li>
						</ul>
					</Card.Body>
				</Card>

				{/* Rappel */}
				<Card className="chapter-card shadow-sm mb-4">
					<Card.Body>
						<h2 className="section-title">Rappel important</h2>
						<p className="mb-0">
							Ici, les listes déroulantes servent à <strong>remplir le formulaire</strong>{" "}
							(création/modification). Le filtrage de la liste d’articles sera traité dans un
							chapitre dédié.
						</p>
					</Card.Body>
				</Card>

				{/* A) */}
				<Card className="chapter-card shadow-sm mb-4">
					<Card.Body>
						<div className="chapter-section">
							<h2 className="section-title">A) Principe — Référentiels &amp; listes déroulantes</h2>
							<p className="mb-3">
								Dans la base SDBM, un article est lié à des <strong>tables de référence</strong>{" "}
								(référentiels) : <strong>marques</strong>, <strong>couleurs</strong> et{" "}
								<strong>types de bière</strong>. Au lieu de saisir ces valeurs “à la main”, on
								choisit dans des listes.
							</p>

							<h3>Pourquoi on fait ça ?</h3>
							<ul className="clean-list mb-3">
								<li>
									Éviter de taper des IDs (ex: <code>idMarque = 3</code>) sans savoir à quoi ça
									correspond.
								</li>
								<li>Réduire les erreurs (mauvais ID, faute de frappe, valeur inexistante).</li>
								<li>Améliorer l’expérience utilisateur (choix clair + rapide).</li>
								<li>
									Envoyer quand même au backend une valeur “propre” : l’<strong>ID</strong> (clé
									étrangère).
								</li>
							</ul>

							<h3>Modèle TypeScript — Article (rappel)</h3>
							<pre className="bg-light border rounded p-3 mb-3">{`
		export interface Article {
		id?: number
		nomArticle: string
		prixAchat?: number | null
		volume?: number | null
		titrage?: number | null
		idMarque?: number | null
		idCouleur?: number | null
		idTypeBiere?: number | null

		// optionnel (si l’API renvoie des libellés)
		marque?: string
		couleur?: string
		typeBiere?: string
	}`}
							</pre>

							<h3>Ce qu’on modifie côté Angular</h3>
							<ul className="clean-list mb-0">
								<li>
									Dans <code>ApiService</code> : ajouter <code>listMarques()</code>,{" "}
									<code>listCouleurs()</code>, <code>listTypesBiere()</code> (GET vers l’API).
								</li>
								<li>
									Dans <code>ArticleFormComponent</code> : charger les 3 listes au démarrage
									(ex: <code>forkJoin</code>) + gérer <code>loadingRefs</code> et{" "}
									<code>errorRefs</code>.
								</li>
								<li>
									Dans <code>article-form.html</code> : remplacer les champs par des{" "}
									<code>&lt;select&gt;</code> liés au formulaire avec <code>[ngValue]</code> pour
									envoyer <strong>des numbers</strong> (pas des strings).
								</li>
							</ul>
						</div>
					</Card.Body>
				</Card>

				{/* B) */}
				<Card className="chapter-card shadow-sm mb-4">
					<Card.Body>
						<div className="chapter-section">
							<h2 className="section-title">B&#41; Modèles TypeScript — Marque / Couleur / Type</h2>
							<p className="mb-3">
								Pour alimenter les listes déroulantes, on récupère des données “référentielles”.
								Pour éviter le <code>any</code> partout, on crée des interfaces TypeScript.
								Emplacement recommandé : <code>src/app/core/models/</code>
							</p>

							<h3>1&#41; marque.model.ts</h3>
							<pre className="bg-light border rounded p-3 mb-3">{`
		// src/app/core/models/marque.model.ts

		export interface Marque {
			id: number
			nomMarque: string
		}`}
							</pre>

							<h3>2&#41; couleur.model.ts</h3>
							<pre className="bg-light border rounded p-3 mb-3">{`
		// src/app/core/models/couleur.model.ts

		export interface Couleur {
			id: number
			nomCouleur: string
		}`}
							</pre>

							<h3>3&#41; type-biere.model.ts</h3>
							<pre className="bg-light border rounded p-3 mb-0">{`
		// src/app/core/models/type-biere.model.ts

		export interface TypeBiere {
			idTypeBiere: number
			nomType: string
		}`}
							</pre>
						</div>
					</Card.Body>
				</Card>

				{/* C) */}
				<Card className="chapter-card shadow-sm mb-4">
					<Card.Body>
						<div className="chapter-section">
							<h2 className="section-title">C&#41; ApiService — charger les listes (référentiels)</h2>
							<p className="mb-3">
								On suppose que chaque endpoint renvoie un <strong>tableau direct</strong>{" "}
								(ex: <code>Marque[]</code>).
							</p>

							<h3>Code</h3>
							<pre className="bg-light border rounded p-3 mb-0">{`
		// src/app/core/api/api.service.ts

		import { Marque } from "../models/marque.model"
		import { Couleur } from "../models/couleur.model"
		import { TypeBiere } from "../models/type-biere.model"

		// ...

		listMarques() {
			return this.http.get<Marque[]>(\`\${this.baseUrl}/marques\`)
		}

		listCouleurs() {
			return this.http.get<Couleur[]>(\`\${this.baseUrl}/couleurs\`)
		}

		listTypesBiere() {
			return this.http.get<TypeBiere[]>(\`\${this.baseUrl}/types-biere\`)
		}`}
						</pre>
						</div>
					</Card.Body>
				</Card>

				{/* D) */}
				<Card className="chapter-card shadow-sm mb-4">
					<Card.Body>
						<div className="chapter-section">
							<h2 className="section-title">D) Formulaire Angular — article-form.ts + article-form.html</h2>
							<p className="mb-3">
								On charge les 3 référentiels au démarrage du formulaire. En cas d’erreur sur un
								endpoint, on renvoie <code>[]</code> pour ne pas bloquer l’écran.
								<br />
								Si tu es en <strong>Angular 21 + Vite</strong>, il peut être nécessaire de forcer
								le rafraîchissement de l’UI avec <code>ChangeDetectorRef</code>.
							</p>

							<h3>1&#41; article-form.ts (forkJoin + catchError + ChangeDetectorRef)</h3>
							<pre className="bg-light border rounded p-3 mb-3">{`
	import { Component, OnInit, ChangeDetectorRef } from "@angular/core"
	import { CommonModule } from "@angular/common"
	import { ActivatedRoute, Router, RouterModule } from "@angular/router"
	import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms"
	import { forkJoin, of } from "rxjs"
	import { catchError, finalize } from "rxjs/operators"

	import { ApiService } from "../../../core/api/api.service"
	import { Article } from "../../../core/models/article.model"
	import { Marque } from "../../../core/models/marque.model"
	import { Couleur } from "../../../core/models/couleur.model"
	import { TypeBiere } from "../../../core/models/type-biere.model"

	@Component({
		selector: "app-article-form",
		standalone: true,
		imports: [CommonModule, RouterModule, ReactiveFormsModule],
		templateUrl: "./article-form.html",
		styleUrl: "./article-form.css",
	})
	export class ArticleFormComponent implements OnInit {
		mode: "create" | "edit" = "create"
		id: number | null = null
		error = ""

		// Référentiels
		marques: Marque[] = []
		couleurs: Couleur[] = []
		typesBiere: TypeBiere[] = []
		loadingRefs = true
		errorRefs = ""

		form: ReturnType<FormBuilder["group"]>

		constructor(
			private fb: FormBuilder,
			private api: ApiService,
			private route: ActivatedRoute,
			private router: Router,
			private cdr: ChangeDetectorRef,
		) {
			this.form = this.fb.group({
				nomArticle: ["", [Validators.required]],
				prixAchat: [null as number | null],
				volume: [null as number | null, [Validators.required, Validators.pattern(/^(33|75)$/)]],
				titrage: [null as number | null],
				idMarque: [null as number | null],
				idCouleur: [null as number | null],
				idTypeBiere: [null as number | null],
			})
		}

		ngOnInit(): void {
			const idParam = this.route.snapshot.paramMap.get("id")
			if (idParam) {
				this.mode = "edit"
				this.id = Number(idParam)
			}

			// Chargement des référentiels
			this.loadingRefs = true
			this.errorRefs = ""

			forkJoin({
				marques: this.api.listMarques().pipe(
					catchError((err) => {
						console.error("Erreur listMarques:", err)
						return of([] as Marque[])
					}),
				),
				couleurs: this.api.listCouleurs().pipe(
					catchError((err) => {
						console.error("Erreur listCouleurs:", err)
						return of([] as Couleur[])
					}),
				),
				types: this.api.listTypesBiere().pipe(
					catchError((err) => {
						console.error("Erreur listTypesBiere:", err)
						return of([] as TypeBiere[])
					}),
				),
			})
				.pipe(
					finalize(() => {
						this.loadingRefs = false
						this.cdr.detectChanges()
					}),
				)
				.subscribe({
					next: (res) => {
						this.marques = res.marques
						this.couleurs = res.couleurs
						this.typesBiere = res.types
						this.cdr.detectChanges()
					},
					error: (err) => {
						console.error("Erreur forkJoin refs:", err)
						this.errorRefs = "Impossible de charger les listes."
						this.cdr.detectChanges()
					},
				})

			// Mode édition : charger l'article
			if (this.mode === "edit" && this.id) {
				this.api.getArticle(this.id).subscribe({
					next: (data) => {
						this.form.patchValue(data as any)
						this.cdr.detectChanges()
					},
					error: () => {
						this.error = "Impossible de charger l’article"
						this.cdr.detectChanges()
					},
				})
			}
		}

		onSubmit(): void {
			this.error = ""

			if (this.form.invalid) {
				this.error = "Formulaire invalide (ex: volume autorisé = 33 ou 75)"
				return
			}

			const payload = this.form.value as Article

			if (this.mode === "create") {
				this.api.createArticle(payload).subscribe({
					next: () => this.router.navigate(["/articles"]),
					error: () => (this.error = "Erreur lors de la création"),
				})
				return
			}

			this.api.updateArticle(this.id!, payload).subscribe({
				next: () => this.router.navigate(["/articles", this.id]),
				error: () => (this.error = "Erreur lors de la modification"),
			})
		}
	}`}							
							</pre>

							<h3>2&#41; article-form.html (loading + selects)</h3>
							<pre className="bg-light border rounded p-3 mb-0">{`
		<div class="container py-3">
		<a [routerLink]="['/articles']">← Retour</a>

		<h1 class="h3 mt-3">
			<span [textContent]="mode === 'create' ? 'Nouvel article' : 'Modifier article'"></span>
		</h1>

		<div *ngIf="error" class="alert alert-danger mt-3">
			<span [textContent]="error"></span>
		</div>

		<form class="mt-3" [formGroup]="form" (ngSubmit)="onSubmit()">
			<div class="mb-3">
				<label class="form-label">Nom</label>
				<input class="form-control" formControlName="nomArticle" />
			</div>

			<div class="row">
				<div class="col-md-4 mb-3">
					<label class="form-label">prixAchat</label>
					<input type="number" class="form-control" formControlName="prixAchat" />
				</div>

				<div class="col-md-4 mb-3">
					<label class="form-label">volume</label>
					<select class="form-select" formControlName="volume">
						<option [ngValue]="null">-- choisir --</option>
						<option [ngValue]="33">33</option>
						<option [ngValue]="75">75</option>
					</select>
					<div class="form-text">Volume autorisé : 33 ou 75.</div>
				</div>

				<div class="col-md-4 mb-3">
					<label class="form-label">titrage</label>
					<input type="number" class="form-control" formControlName="titrage" />
				</div>
			</div>

			<div *ngIf="loadingRefs" class="alert alert-info mt-3">Chargement listes...</div>

			<div *ngIf="!loadingRefs && errorRefs" class="alert alert-danger mt-3">
				<span [textContent]="errorRefs"></span>
			</div>

			<div class="row" *ngIf="!loadingRefs">
				<div class="col-md-4 mb-3">
					<label class="form-label">Marque</label>
					<select class="form-select" formControlName="idMarque">
						<option [ngValue]="null">-- choisir --</option>
						<option *ngFor="let m of marques" [ngValue]="m.id"> m.nomMarque </option>
					</select>
				</div>

				<div class="col-md-4 mb-3">
					<label class="form-label">Couleur</label>
					<select class="form-select" formControlName="idCouleur">
						<option [ngValue]="null">-- choisir --</option>
						<option *ngFor="let c of couleurs" [ngValue]="c.id"> c.nomCouleur </option>
					</select>
				</div>

				<div class="col-md-4 mb-3">
					<label class="form-label">Type Bière</label>
					<select class="form-select" formControlName="idTypeBiere">
						<option [ngValue]="null">-- choisir --</option>
						<option *ngFor="let t of typesBiere" [ngValue]="t.idTypeBiere"> t.nomType </option>
					</select>
				</div>
			</div>

			<button class="btn btn-primary" type="submit">
				<span [textContent]="mode === 'create' ? 'Créer' : 'Enregistrer'"></span>
			</button>
		</form>
</div>`}
							</pre>
						</div>
					</Card.Body>
				</Card>

				{/* Navigation */}
				<div className="chapter-navigation">
					<Link className="btn-prev" to="/coursEtTutos/angular-sdbm/sommaire">
						← Retour sommaire
					</Link>
					<Link className="btn-prev" to="/coursEtTutos/angular-sdbm/connexion-api-routing-crud">
						← Chapitre précédent
					</Link>
					<Link className="btn-next" to="/coursEtTutos/angular-sdbm/filtres-angular">
						Chapitre suivant →
					</Link>
				</div>
			</Container>
		</main>
	)
}