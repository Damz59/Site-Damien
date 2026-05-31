// Chapitre_02_Angular_SDBM_Connexion_API_Routing_CRUD.jsx
import { Link } from "react-router-dom";
import "./Chapitre_Angular_SDBM.css";

export default function Chapitre_02_Angular_SDBM_Connexion_API_Routing_CRUD() {
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
            <h2 className="chapter-title">
            Chapitre 02 — Connexion API + Routing + CRUD (Angular SDBM)
            </h2>
            <p className="chapter-subtitle">
            Objectif : créer le modèle TypeScript, connecter Angular à l’API Spring
            Boot, configurer le routing (standalone), puis préparer les pages CRUD.
            </p>
        </header>

        <div className="chapter-card">
            {/* A */}
            <section className="chapter-section">
            <h3 className="section-title">A) Modèle TypeScript (Article)</h3>

            <p className="mb-2">
                Créer <code>src/app/core/models/article.model.ts</code> :
            </p>

            <div className="chapter-subcard">
                <h4 className="sub-title">Créer le dossier + générer le modèle</h4>
                <div className="cmd">
                <pre>
                    <code>{`# créer le dossier (simple et rapide)
    mkdir -p src/app/core/models

    # alternative (Angular CLI) : génère un modèle TypeScript dans le bon dossier
    # (ça crée aussi les dossiers manquants)
    ng g interface core/models/article --type=model`}</code>
                </pre>
                </div>
            </div>

            <div className="chapter-subcard">
                <h4 className="sub-title">Conception de l’interface</h4>
                <div className="chapter-callout subtle">
                <strong>Pourquoi une interface ici ?</strong>
                <br />
                - Elle décrit la <strong>forme des données</strong> renvoyées par
                l’API (contrat front ↔ API).
                <br />
                - Elle sert de <strong>type</strong> pour HttpClient :{" "}
                <code>Observable&lt;Article[]&gt;</code>,{" "}
                <code>get&lt;Article&gt;()</code> → autocomplétion + erreurs
                détectées tôt.
                <br />
                - Les champs avec <code>?</code> sont <strong>optionnels</strong>{" "}
                (ex : <code>id</code> pas présent lors d’une création).
                <br />
                - Les champs <code>number | null</code> indiquent qu’en base / API
                la valeur peut être <strong>NULL</strong>.
                <br />
                - On met ici uniquement des <strong>données</strong> (pas de
                logique).
                </div>
            </div>

            <div className="chapter-subcard">
                <h4 className="sub-title">article.model.ts</h4>
                <div className="cmd">
                <pre>
                    <code>{`export interface Article {
    id?: number
    nomArticle: string
    prixAchat?: number | null
    volume?: number | null
    titrage?: number | null
    idMarque?: number | null
    idCouleur?: number | null
    idTypeBiere?: number | null
    }`}</code>
                </pre>
                </div>
            </div>
            </section>

            {/* B */}
            <section className="chapter-section">
            <h3 className="section-title">B) Config API (base URL) + service</h3>

            <p className="mb-2">
                Créer le service API dans <code>src/app/core/api/api.service.ts</code>{" "}
                :
            </p>

            <div className="chapter-subcard">
                <h4 className="sub-title">Générer le service (Angular CLI)</h4>
                <div className="cmd">
                <pre>
                    <code>{`# génère automatiquement le service (et le dossier s'il n'existe pas)
    ng g service core/api/api`}</code>
                </pre>
                </div>

                <div className="chapter-callout subtle">
                Résultat attendu :
                <br />- <code>src/app/core/api/api.service.ts</code>
                <br />- <code>src/app/core/api/api.service.spec.ts</code> (si tests
                non désactivés)
                <br />
                <br />
                Si chez toi ça crée <code>api.ts</code> au lieu de{" "}
                <code>api.service.ts</code>, tu peux renommer.
                </div>
            </div>

            <div className="chapter-subcard">
                <h4 className="sub-title">api.service.ts (contenu)</h4>
                <div className="cmd">
                <pre>
                    <code>{`import { Injectable } from "@angular/core"
    import { HttpClient } from "@angular/common/http"
    import { Observable } from "rxjs"
    import { Article } from "../models/article.model"

    @Injectable({ providedIn: "root" })
    export class ApiService {
    // adapte si besoin
    private readonly baseUrl = "http://localhost:8081"

    constructor(private http: HttpClient) {}

    listArticles(): Observable<Article[]> {
        return this.http.get<Article[]>(\`\${this.baseUrl}/articles\`)
    }

    getArticle(id: number): Observable<Article> {
        // ⚠️ adapte selon ton controller : /articles/article/{id} OU /articles/{id}
        return this.http.get<Article>(\`\${this.baseUrl}/articles/article/\${id}\`)
    }

    createArticle(payload: Article): Observable<unknown> {
        return this.http.post(\`\${this.baseUrl}/articles\`, payload)
    }

    updateArticle(id: number, payload: Article): Observable<unknown> {
        return this.http.put(\`\${this.baseUrl}/articles/article/\${id}\`, payload)
    }

    deleteArticle(id: number): Observable<unknown> {
        return this.http.delete(\`\${this.baseUrl}/articles/article/\${id}\`)
    }
    }`}</code>
                </pre>
                </div>

                <div className="chapter-callout subtle">
                Tips :
                <br />• Si ton API n’est pas sur <code>8081</code>, adapte{" "}
                <code>baseUrl</code>.
                <br />• Si ton endpoint n’est pas{" "}
                <code>/articles/article/&lbrace;id&rbrace;</code> mais{" "}
                <code>/articles/&lbrace;id&rbrace;</code>, adapte{" "}
                <code>getArticle()</code>, <code>updateArticle()</code>,{" "}
                <code>deleteArticle()</code>.
                </div>
            </div>

            <div className="chapter-subcard">
                <h4 className="sub-title">Activer HttpClient (standalone)</h4>
                <p className="mb-2">
                Dans <code>src/app/app.config.ts</code> :
                </p>
                <div className="cmd">
                <pre>
                    <code>{`import {
    ApplicationConfig,
    provideBrowserGlobalErrorListeners,
    } from "@angular/core"
    import { provideRouter } from "@angular/router"
    import { provideHttpClient } from "@angular/common/http"
    import { routes } from "./app.routes"

    export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideHttpClient(),
    ],
    }`}</code>
                </pre>
                </div>
            </div>
            </section>

            {/* C */}
            <section className="chapter-section">
            <h3 className="section-title">C) Routing (standalone)</h3>

            <p className="mb-2">
                Le routing est dans <code>src/app/app.routes.ts</code> :
            </p>

            <div className="chapter-subcard">
                <h4 className="sub-title">app.routes.ts</h4>
                <div className="cmd">
                <pre>
                    <code>{`import { Routes } from "@angular/router"
    import { ArticlesListComponent } from "./pages/articles/articles-list/articles-list"
    import { ArticleDetailComponent } from "./pages/articles/article-detail/article-detail"
    import { ArticleFormComponent } from "./pages/articles/article-form/article-form"

    export const routes: Routes = [
    { path: "", redirectTo: "articles", pathMatch: "full" },
    { path: "articles", component: ArticlesListComponent },
    { path: "articles/new", component: ArticleFormComponent },
    { path: "articles/:id", component: ArticleDetailComponent },
    { path: "articles/:id/edit", component: ArticleFormComponent },
    ]`}</code>
                </pre>
                </div>
            </div>

            <div className="chapter-callout subtle">
                Note : en standalone, tu actives le router via{" "}
                <code>provideRouter(routes)</code> dans{" "}
                <code>src/app/app.config.ts</code>.
            </div>
            </section>

            {/* D */}
            <section className="chapter-section">
            <h3 className="section-title">D) Pages (CRUD)</h3>

            <div className="chapter-subcard">
                <h4 className="sub-title">Générer les pages</h4>
                <div className="cmd">
                <pre>
                    <code>{`ng g c pages/articles/articles-list
    ng g c pages/articles/article-detail
    ng g c pages/articles/article-form`}</code>
                </pre>
                </div>

                <div className="chapter-callout subtle">
                En standalone, Angular peut générer des fichiers “courts” :
                <br />
                <code>*.ts</code> / <code>*.html</code> / <code>*.css</code> (au
                lieu de <code>*.component.*</code>).
                </div>
            </div>

            {/* D1 */}
            <div className="chapter-subcard">
                <h4 className="sub-title">D1) Liste des articles</h4>

                <p className="mb-2">
                <code>src/app/pages/articles/articles-list/articles-list.ts</code>
                </p>

                <div className="chapter-callout subtle">
                Cette version est <strong>paginée</strong> et inclut un
                contournement “Angular 21 + Vite” via{" "}
                <code>ChangeDetectorRef.detectChanges()</code>.
                </div>

                <div className="cmd">
                <pre>
                    <code>{`import { Component, OnInit, ChangeDetectorRef } from "@angular/core"
    import { CommonModule } from "@angular/common"
    import { RouterModule } from "@angular/router"
    import { finalize } from "rxjs"
    import { ApiService } from "../../../core/api/api.service"
    import { Article } from "../../../core/models/article.model"

    @Component({
    selector: "app-articles-list",
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: "./articles-list.html",
    styleUrl: "./articles-list.css",
    })
    export class ArticlesListComponent implements OnInit {
    items: Article[] = []
    loading = true
    error = ""

    page = 1
    pageSize = 50

    get totalPages(): number {
        return Math.max(1, Math.ceil(this.items.length / this.pageSize))
    }

    get pagedItems(): Article[] {
        const start = (this.page - 1) * this.pageSize
        return this.items.slice(start, start + this.pageSize)
    }

    constructor(
        private api: ApiService,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.loading = true
        this.error = ""
        this.cdr.detectChanges()

        this.api
        .listArticles()
        .pipe(
            finalize(() => {
            this.loading = false
            this.cdr.detectChanges()
            }),
        )
        .subscribe({
            next: (data) => {
            this.items = data
            this.page = 1
            this.cdr.detectChanges()
            },
            error: (err) => {
            console.error(err)
            this.error = "Erreur chargement articles"
            this.cdr.detectChanges()
            },
        })
    }

    prevPage(): void {
        this.page = Math.max(1, this.page - 1)
    }

    nextPage(): void {
        this.page = Math.min(this.totalPages, this.page + 1)
    }
    }`}</code>
                </pre>
                </div>

                <p className="mb-2">
                <code>src/app/pages/articles/articles-list/articles-list.html</code>
                </p>

                <div className="cmd">
                <pre>
                    <code>{`<div class="container py-3">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="h3 mb-0">Articles</h1>
        <a class="btn btn-primary" routerLink="/articles/new">+ Nouvel article</a>
    </div>

    <div *ngIf="loading" class="alert alert-info">Chargement...</div>

    <div *ngIf="!loading && error" class="alert alert-danger">
        <span [textContent]="error"></span>
    </div>

    <div *ngIf="!loading && !error">
        <ul class="list-group" *ngIf="pagedItems.length > 0; else emptyTpl">
        <li class="list-group-item d-flex justify-content-between align-items-center"
            *ngFor="let a of pagedItems">
            <a [routerLink]="['/articles', a.id]">
            <span [textContent]="a.nomArticle || ('Article #' + a.id)"></span>
            </a>
            <a class="btn btn-sm btn-outline-secondary"
            [routerLink]="['/articles', a.id, 'edit']">Modifier</a>
        </li>
        </ul>

        <ng-template #emptyTpl>
        <div class="alert alert-secondary mb-0">Aucun article.</div>
        </ng-template>

        <div class="d-flex gap-2 align-items-center mt-3" *ngIf="items.length > pageSize">
        <button class="btn btn-outline-secondary" (click)="prevPage()" [disabled]="page === 1">
            ← Précédent
        </button>

        <div class="small">
            Page <strong><span [textContent]="page"></span></strong> /
            <strong><span [textContent]="totalPages"></span></strong>
            — <span [textContent]="items.length"></span> articles
        </div>

        <button class="btn btn-outline-secondary" (click)="nextPage()" [disabled]="page === totalPages">
            Suivant →
        </button>
        </div>
    </div>
    </div>`}</code>
                </pre>
                </div>
            </div>

            {/* D2 */}
            <div className="chapter-subcard">
                <h4 className="sub-title">D2) Détail d’un article</h4>

                <p className="mb-2">
                <code>src/app/pages/articles/article-detail/article-detail.ts</code>
                </p>

                <div className="cmd">
                <pre>
                    <code>{`import { Component, OnInit, ChangeDetectorRef } from "@angular/core"
    import { CommonModule } from "@angular/common"
    import { ActivatedRoute, Router, RouterLink } from "@angular/router"
    import { finalize } from "rxjs"
    import { ApiService } from "../../../core/api/api.service"
    import { Article } from "../../../core/models/article.model"

    @Component({
    selector: "app-article-detail",
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: "./article-detail.html",
    styleUrl: "./article-detail.css",
    })
    export class ArticleDetailComponent implements OnInit {
    item: Article | null = null
    loading = true
    error = ""

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private api: ApiService,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get("id"))
        if (!id) {
        this.error = "ID invalide"
        this.loading = false
        this.cdr.detectChanges()
        return
        }

        this.loading = true
        this.error = ""
        this.item = null
        this.cdr.detectChanges()

        this.api
        .getArticle(id)
        .pipe(
            finalize(() => {
            this.loading = false
            this.cdr.detectChanges()
            }),
        )
        .subscribe({
            next: (data) => {
            this.item = data
            this.cdr.detectChanges()
            },
            error: (err) => {
            console.error(err)
            this.error = "Article introuvable"
            this.cdr.detectChanges()
            },
        })
    }

    onDelete(): void {
        if (!this.item?.id) return
        if (!confirm("Supprimer cet article ?")) return

        this.api.deleteArticle(this.item.id).subscribe({
        next: () => this.router.navigate(["/articles"]),
        error: () => alert("Erreur lors de la suppression"),
        })
    }
    }`}</code>
                </pre>
                </div>

                <p className="mb-2">
                <code>src/app/pages/articles/article-detail/article-detail.html</code>
                </p>

                <div className="cmd">
                <pre>
                    <code>{`<div class="container py-3">
    <a [routerLink]="['/articles']">← Retour</a>

    <div *ngIf="loading" class="alert alert-info mt-3">Chargement...</div>

    <div *ngIf="!loading && error" class="alert alert-danger mt-3">
        <span [textContent]="error"></span>
    </div>

    <div *ngIf="!loading && !error && item">
        <h1 class="h3 mt-3">
        <span [textContent]="item.nomArticle || ('Article #' + item.id)"></span>
        </h1>

        <pre class="mt-3 bg-light p-3 border rounded"><span [textContent]="item | json"></span></pre>

        <div class="d-flex gap-2 mt-3">
        <a class="btn btn-outline-secondary" [routerLink]="['/articles', item.id, 'edit']">Modifier</a>
        <button class="btn btn-outline-danger" (click)="onDelete()">Supprimer</button>
        </div>
    </div>
    </div>`}</code>
                </pre>
                </div>
            </div>

            {/* D3 */}
            <div className="chapter-subcard">
                <h4 className="sub-title">D3) Formulaire (CREATE + UPDATE)</h4>

                <p className="mb-2">
                <code>src/app/pages/articles/article-form/article-form.ts</code>
                </p>

                <div className="chapter-callout subtle">
                Note : le champ <strong>volume</strong> est contraint côté DB (33
                ou 75). On le gère côté front avec une validation + un{" "}
                <code>&lt;select&gt;</code>.
                </div>

                <div className="cmd">
                <pre>
                    <code>{`import { Component, OnInit } from "@angular/core"
    import { CommonModule } from "@angular/common"
    import { ActivatedRoute, Router, RouterModule } from "@angular/router"
    import {
    FormBuilder,
    ReactiveFormsModule,
    Validators,
    } from "@angular/forms"
    import { ApiService } from "../../../core/api/api.service"
    import { Article } from "../../../core/models/article.model"

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

    // form typé + initialisé dans le constructor (pas d’erreur d’ordre d'init)
    form: ReturnType<FormBuilder["group"]>

    constructor(
        private fb: FormBuilder,
        private api: ApiService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.form = this.fb.group({
        nomArticle: ["", [Validators.required]],
        prixAchat: [null as number | null],

        // Contrainte DB : volume doit être 33 ou 75 (sinon erreur SQLState 45000)
        // On ajoute une validation front pour bloquer avant l'envoi.
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

        this.api.getArticle(this.id).subscribe({
            next: (data) => this.form.patchValue(data as any),
            error: () => (this.error = "Impossible de charger l’article"),
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
    }`}</code>
                </pre>
                </div>

                <p className="mb-2">
                <code>src/app/pages/articles/article-form/article-form.html</code>
                </p>

                <div className="cmd">
                <pre>
                    <code>{`<div class="container py-3">
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
            <!-- Contrainte DB : volume doit être 33 ou 75 -->
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

        <div class="row">
        <div class="col-md-4 mb-3">
            <label class="form-label">idMarque</label>
            <input type="number" class="form-control" formControlName="idMarque" />
        </div>
        <div class="col-md-4 mb-3">
            <label class="form-label">idCouleur</label>
            <input type="number" class="form-control" formControlName="idCouleur" />
        </div>
        <div class="col-md-4 mb-3">
            <label class="form-label">idTypeBiere</label>
            <input type="number" class="form-control" formControlName="idTypeBiere" />
        </div>
        </div>

        <button class="btn btn-primary" type="submit">
        <span [textContent]="mode === 'create' ? 'Créer' : 'Enregistrer'"></span>
        </button>
    </form>
    </div>`}</code>
                </pre>
                </div>
            </div>
            </section>

            {/* E */}
            <section className="chapter-section">
            <h3 className="section-title">E) Lancer le front</h3>

            <div className="chapter-subcard">
                <h4 className="sub-title">Commande</h4>
                <div className="cmd">
                <pre>
                    <code>{`ng serve -o`}</code>
                </pre>
                </div>
            </div>
            </section>
        </div>
        {/* Navigation chapitre */}
        <div className="chapter-navigation">
            <Link
                className="btn-prev"
                to="/coursEtTutos/angular-sdbm/creation-du-projet"
            >
                ← Précédent → Chapitre 01
            </Link>

            <Link
                className="btn-next"
                to="/coursEtTutos/angular-sdbm/chapitre-03"
            >
                Suivant → Chapitre 03 →
            </Link>
            </div>
        </main>
    );
}