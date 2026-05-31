-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 01 juin 2026 à 01:13
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `site_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `cours_et_tutos_categories`
--

CREATE TABLE `cours_et_tutos_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `position` int(11) NOT NULL DEFAULT 0,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `cours_et_tutos_categories`
--

INSERT INTO `cours_et_tutos_categories` (`id`, `name`, `position`, `active`, `created_at`, `updated_at`) VALUES
(1, 'Développement', 1, 1, '2026-02-15 16:38:21', '2026-02-15 19:40:02'),
(2, 'Exercice', 2, 1, '2026-05-04 21:02:40', '2026-05-07 01:47:04');

-- --------------------------------------------------------

--
-- Structure de la table `cours_et_tutos_chapters`
--

CREATE TABLE `cours_et_tutos_chapters` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `position` int(11) NOT NULL DEFAULT 0,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `cours_et_tutos_chapters`
--

INSERT INTO `cours_et_tutos_chapters` (`id`, `course_id`, `title`, `slug`, `position`, `active`, `created_at`, `updated_at`) VALUES
(1, 1, 'Introduction', 'introduction', 1, 1, '2026-02-27 22:50:49', '2026-02-27 22:50:49'),
(2, 1, 'JSX et composants', 'jsx-et-composants', 2, 1, '2026-02-27 22:50:49', '2026-02-27 22:50:49'),
(3, 2, 'Introduction', 'introduction', 1, 1, '2026-03-01 00:31:57', '2026-03-01 00:31:57'),
(9, 2, 'Variables et types', 'variables-et-types', 2, 1, '2026-03-01 00:50:46', '2026-03-01 00:50:46'),
(10, 2, 'Conditions et boucles', 'conditions-et-boucles', 3, 1, '2026-03-01 00:50:46', '2026-03-01 00:50:46'),
(11, 2, 'Fonctions', 'fonctions', 4, 1, '2026-03-01 00:50:46', '2026-03-01 00:50:46'),
(12, 2, 'PDO + MySQL', 'pdo-mysql', 5, 1, '2026-03-01 00:50:46', '2026-03-01 00:50:46'),
(13, 4, 'Flutter — Chapitre 1 : Qu’est-ce que Flutter ?', 'flutter_chapitre_1', 1, 1, '2026-03-16 00:27:48', '2026-03-16 00:35:26'),
(14, 4, 'Flutter — Chapitre 2 : Installation & premier projet', 'flutter_chapitre_2', 2, 1, '2026-03-16 00:27:48', '2026-03-16 00:35:26'),
(15, 4, 'Dart — Chapitre 3 : première app (CLI)', 'dart_chapitre_3', 3, 1, '2026-03-16 00:27:48', '2026-03-16 00:35:27'),
(16, 7, 'Java SDBM — Chapitre 1 : Création du projet', 'creation-du-projet', 1, 1, '2026-05-06 22:40:40', '2026-05-06 22:59:18'),
(17, 7, 'Java SDBM — Chapitre 2 : Création des entités', 'creation-des-entites', 2, 1, '2026-05-09 17:17:47', '2026-05-13 23:37:45'),
(18, 7, 'Java SDBM — Chapitre 3 : Relations JPA', 'relations-jpa', 3, 1, '2026-05-12 19:52:11', '2026-05-13 23:37:33'),
(19, 7, 'Java SDBM — Chapitre 4 : Création des autres entités', 'creation-des-autres-entites', 4, 1, '2026-05-13 23:37:07', '2026-05-13 23:37:24'),
(20, 7, 'Java SDBM — Chapitre 5: Création du CRUD', 'creation-crud', 5, 1, '2026-05-20 23:42:17', '2026-05-20 23:42:17'),
(21, 7, 'Java SDBM — Chapitre 06: Validation + gestion d’erreurs', 'validation-gestion-erreurs', 6, 1, '2026-05-24 22:46:24', '2026-05-28 23:54:51'),
(22, 10, 'Angular SDBM - Chapitre 01:  Création du projet', 'creation-du-projet', 1, 1, '2026-05-29 19:12:20', '2026-05-29 19:14:09'),
(23, 10, 'Angular SDBM - Chapitre 02: Création Connexion API Routing CRUD', 'connexion-api-routing-crud', 2, 1, '2026-05-29 22:39:26', '2026-05-29 22:39:26');

-- --------------------------------------------------------

--
-- Structure de la table `cours_et_tutos_items`
--

CREATE TABLE `cours_et_tutos_items` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `title` varchar(120) NOT NULL,
  `slug` varchar(120) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `position` int(11) NOT NULL DEFAULT 1,
  `short_desc` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `cours_et_tutos_items`
--

INSERT INTO `cours_et_tutos_items` (`id`, `category_id`, `title`, `slug`, `active`, `position`, `short_desc`, `image_url`, `created_at`, `updated_at`) VALUES
(1, 1, 'ReactJS', 'reactjs', 1, 1, 'Cours ReactJS', '/logos/react.svg', '2026-02-23 15:30:18', '2026-02-23 18:56:29'),
(2, 1, 'PHP', 'php', 1, 2, 'Cours PHP', '/logos/php.png', '2026-02-23 15:30:18', '2026-02-23 19:02:38'),
(4, 1, 'Dart / Flutter', 'dart_flutter', 1, 3, 'Cours Dart / Flutter pour débutant', '/logos/Dart_Flutter.png', '2026-03-15 22:11:10', '2026-03-16 01:28:24'),
(7, 2, 'Java', 'java_sdbm', 1, 1, 'Création de la partie backend sous Java pour l\'exercice SDBM', '/logos/java.svg', '2026-05-04 19:10:41', '2026-05-29 18:02:51'),
(10, 2, 'Angular', 'angular-sdbm', 1, 2, 'Création de la partie frontend sous  Angular pour l\'exercice SDBM', '/logos/Angular.svg', '2026-05-29 18:00:56', '2026-05-29 18:00:56');

-- --------------------------------------------------------

--
-- Structure de la table `cv_items`
--

CREATE TABLE `cv_items` (
  `id` int(11) NOT NULL,
  `section` varchar(50) NOT NULL,
  `text` text NOT NULL,
  `description` text DEFAULT NULL,
  `position` int(11) NOT NULL DEFAULT 0,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `cv_items`
--

INSERT INTO `cv_items` (`id`, `section`, `text`, `description`, `position`, `active`, `created_at`, `updated_at`) VALUES
(2, 'formations_info', '2025 — Se spécialiser en développement Full Stack (AFPA Roubaix)', '*Durée : 435 heures (dont 140 heures en entreprise) | Du 02/01/2025 au 24/03/2025*\n\nFormation non certifiante axée sur le développement full stack. Objectifs : configurer l\'infrastructure matérielle et système, concevoir et interroger des bases de données, développer le back-end (Java, Python, Ruby, PHP) et le front-end (JavaScript, HTML, CSS), gérer et planifier un projet avec des méthodes agiles (Scrum, Kanban), interagir avec le client, documenter l\'ensemble des parties du projet et être en charge du déploiement et de l\'environnement de production. Taux d\'assiduité effectif : entre 50 et 80%.', 2, 1, '2026-02-09 20:18:27', '2026-02-09 20:18:27'),
(3, 'formations_info', '2024 - MS Développement d\'applications (ajouté par France Travail)', 'Technique de base du développement d\'applications - AFPA Roubaix\nDurée : 282 heures | Du 07/10/2024 au 03/12/2024\nFormation non certifiante axée sur les bases algorithmiques et la programmation orientée objet. Objectifs : maîtriser les bases algorithmiques préalables à l\'approche programmation objet et les bases du développement d\'une application orientée objet. Taux d\'assiduité effectif : plus de 80%.', 3, 1, '2026-02-10 09:44:51', '2026-02-10 09:44:51'),
(4, 'formations_info', '2017 - Diplôme Technicien d\'Assistance en Informatique (Niveau Bac)', 'Technicien(ne) d\'Assistance Informatique - AKXIA Villeneuve d\'Ascq\nDurée : 700 heures (dont 210 heures en entreprise) | Du 03/10/2016 au 10/03/2017\nFormation de niveau Bac (Titre professionnel). Temps effectué : 100 jours dont 30 jours en entreprise.\nTechnicien d’assistance informatique orienté service : installation, support utilisateurs, diagnostic/dépannage, maintenance, et sécurisation des postes et systèmes, sur site ou à distance, avec rigueur et sens de la communication.', 4, 1, '2026-02-10 10:32:53', '2026-02-10 10:32:53'),
(5, 'formations_elec', '2013 - Habilitation électrique B1/B1V/BR/BS', 'AREP F.R.E.S.C.C (Roubaix)\nDu 02/12/2013 au 04/12/2013\nAttestation et certificat de formation à l’habilitation électrique.\nHabilitations électriques (B1/B1V/BR/BS) : réalisation d’interventions et de dépannages en basse tension dans le respect des consignes de sécurité, application des procédures, analyse des risques et utilisation des équipements de protection.', 1, 1, '2026-02-10 10:46:21', '2026-02-10 10:49:35'),
(6, 'formations_elec', '2009 - Habilitation électrique (type B1V / BR / BC)', 'AFPI acm formation (Tourcoing / Wasquehal)\nDu 07/09/2009 au 09/09/2009\nValidation théorique et attestation de stage (références UTE C 18-510).\nHabilitations électriques (B1/B1V/BR/BC) : réalisation d’interventions et de dépannages en basse tension dans le respect des consignes de sécurité, application des procédures, analyse des risques et utilisation des équipements de protection.', 2, 1, '2026-02-10 10:48:25', '2026-02-10 10:49:54'),
(7, 'formations_generales', '2001 - BTS Informatique Industrielle (1ère année)', 'Lycée André Malraux - Béthune (62)\n\nBases en programmation C, algorithmique et notions d’architecture microprocesseur (Motorola 68000).', 1, 1, '2026-02-10 12:01:04', '2026-02-10 12:01:23'),
(8, 'formations_generales', '2000 - Baccalauréat technologique STI – spécialité Génie électrotechnique', 'Académie de Lille\nFormation orientée électrotechnique : bases en circuits et mesures, lecture de schémas, installation et maintenance d’équipements électriques, avec application des règles de sécurité.', 2, 1, '2026-02-10 12:04:36', '2026-02-10 12:04:36'),
(9, 'formations_generales', '2000 - Certificat individuel de participation à l’Appel de préparation à la défense (APD)', 'Justificatif officiel de participation à la journée de préparation à la défense, nécessaire pour certains dossiers administratifs et examens.', 3, 1, '2026-02-10 12:08:04', '2026-02-10 12:08:04'),
(10, 'formations_generales', '1996 - Diplôme national du brevet (série collège)', 'Académie de Lille – Département du Nord\nValidation des acquis de fin de collège (socle commun) : français, mathématiques, sciences, histoire-géographie et langue vivante.', 4, 1, '2026-02-10 12:11:10', '2026-02-10 12:11:10'),
(11, 'competences_front', 'React (avec Vite)', 'Création d’interfaces modernes en composants, gestion d’état, routing, consommation d’API, et build optimisé (Vite) pour le développement et le déploiement.', 1, 1, '2026-02-10 12:17:56', '2026-02-10 12:23:38'),
(12, 'competences_front', 'Bootstrap / React-Bootstrap', 'Intégration rapide de composants UI responsives (grille, formulaires, navigation), personnalisation via classes/utilitaires, et cohérence du design sur desktop et mobile.', 2, 1, '2026-02-10 12:20:29', '2026-02-10 12:23:15'),
(13, 'competences_front', 'HTML5 / CSS3', 'Intégration de pages sémantiques, mise en forme (Flexbox, Grid), responsive design, et respect des bonnes pratiques d’accessibilité et de compatibilité navigateurs.', 3, 1, '2026-02-10 12:22:58', '2026-02-10 12:22:58'),
(14, 'competences_front', 'JavaScript', 'Manipulation du DOM, gestion d’événements, appels API (fetch), logique applicative, et utilisation des fonctionnalités ES6+ (modules, async/await) en contexte web.', 4, 1, '2026-02-10 12:26:17', '2026-02-10 12:26:17'),
(15, 'competences_front', 'Responsive design', 'Adaptation des interfaces à tous les écrans (mobile-first), gestion des breakpoints, optimisation de l’ergonomie et des performances, et tests multi-navigateurs/multi-devices.', 5, 1, '2026-02-10 12:29:34', '2026-02-10 12:29:34'),
(16, 'competences_back', 'PHP', 'Développement d’une API pour le site (ex. endpoint de formulaire de contact), traitement/validation des données, gestion CORS, interactions avec MariaDB, et gestion des erreurs côté serveur.', 1, 1, '2026-02-10 12:32:15', '2026-02-10 12:32:15'),
(17, 'competences_back', 'Apache2 (configuration et déploiement)', 'Mise en place du serveur web pour héberger le site, configuration (VirtualHost, droits, réécritures pour SPA), activation HTTPS (Let’s Encrypt) et déploiement des builds (mise en ligne /var/www/html).', 2, 1, '2026-02-10 12:34:35', '2026-02-10 12:34:35'),
(18, 'competences_back', 'MariaDB / MySQL', 'Conception et utilisation de la base de données du site (ex. table messages pour le formulaire de contact), écriture de requêtes SQL (CRUD), gestion des utilisateurs/droits, et exploitation via phpMyAdmin.', 3, 1, '2026-02-10 12:37:47', '2026-02-10 12:37:47'),
(19, 'competences_back', 'API REST', 'Conception de endpoints, définition des routes et des réponses JSON, gestion des codes HTTP, et intégration avec le front (fetch) pour envoyer/recevoir des données de façon sécurisée.', 4, 1, '2026-02-10 12:39:41', '2026-02-10 12:39:41'),
(20, 'langages_de_programmation', 'Javascript', '(niveau débutant) :\nBases en ES6+ (modules, async/await), manipulation du DOM, gestion d’événements et appels API (fetch) en contexte React/Vite. Capable de développer des fonctionnalités front simples et de progresser rapidement sur des sujets plus avancés.', 2, 1, '2026-02-11 18:22:33', '2026-02-11 18:34:37'),
(22, 'langages_de_programmation', 'HTML / CSS', '(niveau débutant) : intégration de pages simples et sémantiques, mise en forme avec Flexbox et bases de responsive (breakpoints), utilisation de classes/utilitaires (Bootstrap) et adaptation progressive du design.', 1, 1, '2026-02-11 18:33:15', '2026-02-11 18:34:37'),
(23, 'langages_de_programmation', 'PHP', '(niveau débutant) :\nCréation d’endpoints simples (API), récupération/validation de données, réponses JSON, gestion basique des erreurs, et interactions avec MariaDB via PDO.', 3, 1, '2026-02-11 18:34:31', '2026-02-11 18:34:31'),
(24, 'langages_de_programmation', 'C#', '(OpenClassrooms) :\nApprentissage des bases du langage et de la programmation orientée objet. Déclaration et manipulation de variables, compréhension des types de données, création de classes et d’objets, et utilisation des collections adaptées. Mise en pratique du déroulement d’un programme avec Main, conditions et boucles, gestion des erreurs et exceptions, ainsi que des interactions avec l’utilisateur. Approche orientée qualité avec méthodes/fonctions, paramètres et valeurs de retour, tests, débogage et découverte de la récursivité, avec un exercice final de création d’une première application.', 6, 1, '2026-02-12 17:23:19', '2026-02-12 18:07:35'),
(25, 'langages_de_programmation', 'C', '1ère année BTS II:\nBase en C, condition, itération, Opération sur les variables et tableaux', 7, 1, '2026-02-12 17:26:56', '2026-02-12 18:07:32'),
(26, 'langages_de_programmation', 'BASIC', 'AMSTRAD :\nDécouverte ludique de la programmation à partir d’un livre fourni avec l’ordinateur. Apprentissage des bases de la logique (variables, conditions, boucles), de l’écriture de petits programmes et de la résolution de problèmes simples, avec une approche progressive orientée pratique qui a permis de comprendre les fondamentaux de l’algorithmique.', 8, 1, '2026-02-12 17:32:41', '2026-02-12 18:07:30'),
(27, 'langages_de_programmation', 'Python', '(niveau débutant) :\nBases du langage (environnement, variables, types, listes, dictionnaires), logique de programme (conditions, boucles, fonctions, bonnes pratiques), et utilisation de packages pour l’extraction et la transformation de données web. Initiation à Django (projet, vues, templates, modèles, migrations, admin, CRUD) et à la POO (classes, héritage, exceptions). Réalisation de mini-projets via tutos, dont une application de reconnaissance faciale et une application de personnalisation d’IA locale (LM Studio).', 4, 1, '2026-02-12 17:48:58', '2026-02-12 17:49:09'),
(28, 'frameworks', 'React (avec Vite):', 'Création d’interfaces en composants, gestion d’état, routing, consommation d’API, et build optimisé.\n(Cours OpenClassrooms et Graphikart)', 1, 1, '2026-02-12 17:56:15', '2026-02-12 17:56:15'),
(29, 'frameworks', 'Django', 'Initiation aux bases (projet, vues, templates, modèles, migrations, admin) et mise en place d’un CRUD simple.\n(Cours OpenClassrooms)', 2, 1, '2026-02-12 17:57:08', '2026-02-12 17:57:08'),
(30, 'langages_de_programmation', 'JAVA', '(niveau débutant) :\nBases du langage (variables, fonctions, manipulation de données), programmation orientée objet (classes, héritage), collections, exceptions, et notions d’approfondissement (logging, streams, lambda, threads).', 5, 1, '2026-02-12 18:07:24', '2026-02-12 18:07:35'),
(31, 'frameworks', 'Spring Boot / Spring Security', '(niveau débutant)\n Découverte du développement d’applications web sécurisées en Java. Mise en place de l’authentification et de l’autorisation, contrôle d’accès par rôles, page de connexion personnalisée, utilisateurs en base, et introduction à OAuth 2.0 / OpenID Connect et JWT (exemples avec Auth0).', 3, 1, '2026-02-12 18:09:08', '2026-02-12 18:09:08'),
(33, 'systemes_et_reseaux', 'Linux', 'utilisation de Linux (Raspberry Pi OS) pour héberger et administrer le site. Installation et configuration d’un stack LAMP (Apache2, PHP, MariaDB), gestion des services (systemctl), déploiement et manipulation de fichiers/dossiers, gestion des droits, configuration VirtualHost, et accès distant via SSH/VNC. Mise en place d’un domaine via DuckDNS et maintenance basique du serveur.', 1, 1, '2026-02-12 18:13:47', '2026-02-12 18:13:47'),
(34, 'systemes_et_reseaux', 'Installation d\'un réseau', 'Mise en place et organisation d’un réseau local domestique autour d’une box Internet et d’un hub/switch 5 ports. Raccordement et configuration de plusieurs équipements (2 postes, Raspberry Pi serveur, TV), gestion de l’adressage IP sur le LAN (DHCP/réservation), tests de connectivité, et accès aux services du Raspberry Pi depuis les postes (SSH / services web) pour l’hébergement du site.', 2, 1, '2026-02-12 18:16:32', '2026-02-12 18:16:32'),
(35, 'electronique_et_hardware', 'Arduino / Raspberry / électronique', 'Mise en place et utilisation d’un Raspberry Pi (montage, préparation de la carte SD, installation de Raspberry Pi OS, configuration réseau, accès distant SSH/VNC) pour des usages serveur et tests techniques. Découverte de l’électronique et de la programmation embarquée avec Arduino via un kit Elegoo 37 Sensor Kit (capteurs, LED, boutons, modules), réalisation de montages simples sur breadboard et écriture de sketches de base pour lire des capteurs et piloter des sorties.', 1, 1, '2026-02-12 18:23:48', '2026-02-12 18:23:48'),
(36, 'competence_electricite', 'Raccordement et fixation d’éléments en courant faible et courant fort', '(niveau avancé) : pose et fixation d’équipements (goulottes, coffrets, prises, luminaires, appareillages, interrupteurs, disjoncteurs, tableaux, boîtes de dérivation), tirage et raccordement des conducteurs, perçage/chevillage, scellement, repérage et préparation des supports, avec respect des plans, des normes de sécurité et de la qualité de finition.', 1, 1, '2026-02-12 19:59:47', '2026-02-12 20:09:42'),
(37, 'competence_electricite', 'Positionnement d\'armoires électriques (locaux domestiques/tertiaires)', 'pose et mise en place d’armoires/coffrets électriques (fixation, mise à niveau, alignement), repérage des arrivées/départs, respect des plans d’implantation, préparation des passages de câbles (goulottes, gaines), et anticipation de l’accessibilité/ventilation et des contraintes de sécurité sur chantier.', 2, 1, '2026-02-12 20:13:03', '2026-02-12 20:13:03'),
(38, 'competence_electricite', 'Utilisation d\'appareils de mesure électrique', 'Utilisation d’outils de mesure en basse tension (multimètre, pince ampèremétrique, testeur de continuité, contrôleur d’isolement) pour vérifier tension, intensité, continuité et isolement. Réalisation de contrôles avant intervention, diagnostic de pannes simples (coupure, court-circuit, défaut d’isolement) et vérification de l’absence de tension, avec application des règles de sécurité (EPI, consignation, VAT).', 3, 1, '2026-02-12 20:16:56', '2026-02-12 20:16:56'),
(39, 'competence_electricite', 'Lecture de plans et schémas', 'Lecture et interprétation de plans d’implantation, schémas unifilaires/multifilaires et synoptiques. Repérage des circuits et des organes (protections, commandes, éclairage, prises, courants faibles), compréhension des légendes et repérages (numérotation, sections, couleurs), et application sur chantier pour préparer le câblage, l’implantation des équipements et les contrôles.', 4, 1, '2026-02-12 20:18:32', '2026-02-12 20:18:32'),
(40, 'competence_electricite', 'Électricité BTP', 'Réalisation de travaux d’installation et de raccordement sur chantier (éclairage, prises, tableaux, chemins de câbles, gaines, coffrets), tirage et repérage des conducteurs, raccordements courant fort et courant faible selon plans. Participation aux opérations de mise en sécurité (consignation, VAT), dépannage simple et contrôles (continuité, isolement), avec respect des normes et des contraintes de chantier (coactivité, délais, qualité de finition).', 5, 1, '2026-02-12 20:26:07', '2026-02-12 20:26:07'),
(41, 'competence_electricite', 'Détection Incendie', 'participation à l’installation et au raccordement de matériels de SSI (déclencheurs manuels, détecteurs, sirènes/flash, modules) et au tirage/raccordement des câbles associés, en respectant le repérage et les cheminements. Réalisation de vérifications de base (continuité, polarités, absence de défaut apparent), aide aux essais fonctionnels et au signalement des anomalies, avec application des consignes de sécurité et des règles de chantier.', 6, 1, '2026-02-12 20:35:54', '2026-02-12 20:35:54'),
(42, 'competence_electricite', 'Contrôle d\'accès', '(niveau intermédiaire)\nparticipation à l’installation et au raccordement de systèmes de contrôle d’accès (lecteurs de badges, claviers, ventouses/gâches électriques, boutons poussoirs, contacts de porte). Tirage et raccordement en courant faible, repérage des câbles, vérification des alimentations et des liaisons (continuité/polarité), et tests de fonctionnement de base (ouverture/fermeture, commande, signalisation), dans le respect des consignes de sécurité et des règles de chantier.', 7, 1, '2026-02-12 20:40:18', '2026-02-12 20:40:18'),
(43, 'competence_electricite', 'Audio et Vidéo', '(niveau intermédiaire)\nParticipation à l’installation, au raccordement et aux tests de base de systèmes audio/vidéo en courant faible (sonorisation, diffusion, équipements de visiophonie/vidéosurveillance selon contexte). Tirage et repérage des câbles (RJ45, coaxial, paires), pose et raccordement des équipements (prises, connecteurs, boîtiers), vérification des alimentations et des liaisons, et contrôle du fonctionnement (signal, image, son), dans le respect des plans et des règles de sécurité.', 8, 1, '2026-02-12 20:48:54', '2026-02-12 20:48:54'),
(44, 'competence_electricite', 'Automatisme', '(niveau débutant)\nBases en automatisme et logique de commande (relais, contacts NO/NF, schémas de commande simples), compréhension des notions d’entrées/sorties et de sécurités (arrêt d’urgence, interverrouillages). Capable d’intervenir sur du câblage et du repérage simples, et de suivre un schéma pour réaliser ou contrôler une commande basique, dans le respect des consignes de sécurité.', 9, 1, '2026-02-12 20:50:53', '2026-02-12 20:50:53');

-- --------------------------------------------------------

--
-- Structure de la table `cv_sections`
--

CREATE TABLE `cv_sections` (
  `section` varchar(50) NOT NULL,
  `label` varchar(100) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `position` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `cv_sections`
--

INSERT INTO `cv_sections` (`section`, `label`, `active`, `position`) VALUES
('competences_back', 'Compétences Back-end', 1, 40),
('competences_front', 'Compétences Front-end', 1, 30),
('competence_electricite', 'Compétence électricité', 1, 100),
('electronique_et_hardware', 'Électronique et hardware', 1, 80),
('formations_elec', 'Formation électricité', 1, 90),
('formations_generales', 'Formations générales', 1, 10),
('formations_info', 'Formations informatiques', 1, 20),
('frameworks', 'Frameworks', 1, 60),
('langages_de_programmation', 'Langages de programmation', 1, 50),
('systemes_et_reseaux', 'Systèmes et réseaux', 1, 70);

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `sujet` varchar(200) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `lu` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `news_items`
--

CREATE TABLE `news_items` (
  `id` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `position` int(11) NOT NULL DEFAULT 1,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `news_items`
--

INSERT INTO `news_items` (`id`, `text`, `position`, `active`, `created_at`, `updated_at`) VALUES
(9, 'Création de l\'exercice sur la SDBM 🍺!', 1, 1, '2026-05-09 17:16:22', '2026-05-09 17:16:22');

-- --------------------------------------------------------

--
-- Structure de la table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token_hash` varchar(64) NOT NULL,
  `expires_at` datetime NOT NULL,
  `used` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `password_resets`
--

INSERT INTO `password_resets` (`id`, `user_id`, `token_hash`, `expires_at`, `used`, `created_at`) VALUES
(1, 2, '70ca533f8f1ba43b1d2eddf2929f0a3b1405bbeee127d52e42ca7e204497c7a5', '2026-03-31 02:07:59', 0, '2026-03-31 01:52:59'),
(2, 2, '2dd3ddb082f0e7e4d59be27c168f814530d5b1db472be53438f7522add896e6a', '2026-03-31 02:11:51', 0, '2026-03-31 01:56:51'),
(3, 2, '5c93241a304ce592d444443b0de81652ff690442fd193fb5845bc3b43d5b187a', '2026-03-31 02:26:00', 1, '2026-03-31 02:11:00');

-- --------------------------------------------------------

--
-- Structure de la table `site_settings`
--

CREATE TABLE `site_settings` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `value` text NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user','moderator') DEFAULT 'user',
  `active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `prenom` varchar(100) DEFAULT NULL,
  `nom` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `active`, `created_at`, `updated_at`, `prenom`, `nom`) VALUES
(2, 'damien', 'damienvdh59@gmail.com', '$2y$10$4jMMnUQML4lrj3lYzMuwl.xFxzGidhT0yo.gjSAzMhjAN4kvMvRrK', 'admin', 1, '2026-01-27 21:36:09', '2026-03-31 00:14:00', NULL, NULL),
(6, 'johndoe59', 'johndoe59@msg.com', '$2y$10$kyKwKHU6/I5jI8Ehfy2FDeCIkkhGdYXisI6FTYAEYpF1PiJaSg1Xu', 'user', 1, '2026-03-24 23:15:45', '2026-03-24 23:15:45', 'John', 'Doe');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cours_et_tutos_categories`
--
ALTER TABLE `cours_et_tutos_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `cours_et_tutos_chapters`
--
ALTER TABLE `cours_et_tutos_chapters`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_course_slug` (`course_id`,`slug`),
  ADD KEY `idx_course` (`course_id`);

--
-- Index pour la table `cours_et_tutos_items`
--
ALTER TABLE `cours_et_tutos_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `fk_cours_et_tutos_items_category` (`category_id`);

--
-- Index pour la table `cv_items`
--
ALTER TABLE `cv_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_section_position` (`section`,`position`);

--
-- Index pour la table `cv_sections`
--
ALTER TABLE `cv_sections`
  ADD PRIMARY KEY (`section`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `news_items`
--
ALTER TABLE `news_items`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `token_hash` (`token_hash`),
  ADD KEY `expires_at` (`expires_at`);

--
-- Index pour la table `site_settings`
--
ALTER TABLE `site_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `cours_et_tutos_categories`
--
ALTER TABLE `cours_et_tutos_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `cours_et_tutos_chapters`
--
ALTER TABLE `cours_et_tutos_chapters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `cours_et_tutos_items`
--
ALTER TABLE `cours_et_tutos_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `cv_items`
--
ALTER TABLE `cv_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `news_items`
--
ALTER TABLE `news_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `site_settings`
--
ALTER TABLE `site_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `cours_et_tutos_chapters`
--
ALTER TABLE `cours_et_tutos_chapters`
  ADD CONSTRAINT `fk_chapters_course` FOREIGN KEY (`course_id`) REFERENCES `cours_et_tutos_items` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `cours_et_tutos_items`
--
ALTER TABLE `cours_et_tutos_items`
  ADD CONSTRAINT `fk_cours_et_tutos_items_category` FOREIGN KEY (`category_id`) REFERENCES `cours_et_tutos_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `password_resets`
--
ALTER TABLE `password_resets`
  ADD CONSTRAINT `fk_password_resets_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
