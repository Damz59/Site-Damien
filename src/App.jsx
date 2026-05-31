// src/App.jsx

import "bootstrap/dist/css/bootstrap.min.css";
import {
	BrowserRouter,
	Routes,
	Route,
	useLocation,
	useNavigate,
	Navigate,
} from "react-router-dom";
import { useEffect, useState, useCallback, useRef } from "react";

import Header from "./components/Header/Header.jsx";
import useIdleAuthPing from "./hooks/useIdleAuthPing";
import Body from "./components/Body/Body.jsx";
import Footer from "./components/Footer/Footer.jsx";

import Admin from "./pages/admin/Admin.jsx";
import Admin_CVCompetences from "./pages/cvcompetences/Admin_CVCompetences.jsx";

import CoursEtTutos from "./pages/coursEtTutos/CoursEtTutos.jsx";
import AdminCoursEtTutos from "./pages/coursEtTutos/Admin_CoursEtTutos.jsx";

import Sommaire_ReactJs from "./pages/coursEtTutos/Cours_et_Tutoriels/ReactJs/Sommaire_ReactJs.jsx";
import Sommaire_Php from "./pages/coursEtTutos/Cours_et_Tutoriels/Php/Sommaire_Php.jsx";

// Routeur dynamique chapitres ReactJS
import Cours_ReactJs_Router from "./pages/coursEtTutos/Cours_et_Tutoriels/ReactJs/Cours_ReactJs_Router.jsx";

// ✅ AJOUT : routeur dynamique chapitres PHP
import Cours_Php_Router from "./pages/coursEtTutos/Cours_et_Tutoriels/Php/Cours_Php_Router.jsx";

// ✅ AJOUT : page admin chapitres ReactJS
import Admin_Sommaire_ReactJs from "./pages/coursEtTutos/Cours_et_Tutoriels/ReactJs/Admin_Sommaire_ReactJs.jsx";

// ✅ AJOUT : page admin chapitres PHP
import Admin_Sommaire_Php from "./pages/coursEtTutos/Cours_et_Tutoriels/Php/Admin_Sommaire_Php.jsx";

// ✅ AJOUT : Sommaire + Router Dart/Flutter (tiret bas)
import Sommaire_Dart_Flutter from "./pages/coursEtTutos/Cours_et_Tutoriels/Dart_Flutter/Sommaire_Dart_Flutter.jsx";
import Cours_Dart_Flutter_Router from "./pages/coursEtTutos/Cours_et_Tutoriels/Dart_Flutter/Cours_Dart_Flutter_Router.jsx";

// ✅ AJOUT : page admin chapitres Dart/Flutter
import Admin_Sommaire_Dart_Flutter from "./pages/coursEtTutos/Cours_et_Tutoriels/Dart_Flutter/Admin_Sommaire_Dart_Flutter.jsx";

// ✅ AJOUT : Sommaire + Router Exercice Java SDBM
import Sommaire_Exercice_Java_SDBM from "./pages/coursEtTutos/Cours_et_Tutoriels/Exercice_Java_SDBM/Sommaire_Exercice_Java_SDBM.jsx";
import Exercice_Java_SDBM_Router from "./pages/coursEtTutos/Cours_et_Tutoriels/Exercice_Java_SDBM/Exercice_Java_SDBM_Router.jsx";

// ✅ AJOUT : page admin chapitres Exercice Java SDBM
import Admin_Sommaire_Exercice_Java_SDBM from "./pages/coursEtTutos/Cours_et_Tutoriels/Exercice_Java_SDBM/Admin_Sommaire_Exercice_Java_SDBM.jsx";

// ✅ AJOUT : Sommaire + Router Exercice Angular SDBM (slug BDD = angular-sdbm)
import Sommaire_Exercice_Angular_SDBM from "./pages/coursEtTutos/Cours_et_Tutoriels/Exercice_Angular_SDBM/Sommaire_Exercice_Angular_SDBM.jsx";
import Exercice_Angular_SDBM_Router from "./pages/coursEtTutos/Cours_et_Tutoriels/Exercice_Angular_SDBM/Exercice_Angular_SDBM_Router.jsx";

// ✅ AJOUT : page admin chapitres Exercice Angular SDBM
import Admin_Sommaire_Exercice_Angular_SDBM from "./pages/coursEtTutos/Cours_et_Tutoriels/Exercice_Angular_SDBM/Admin_Sommaire_Exercice_Angular_SDBM.jsx";

import User from "./pages/user/User.jsx";
import Projets from "./pages/projets/Projets.jsx";
import CVCompetences from "./pages/cvcompetences/CVCompetences.jsx";
import Contact from "./pages/contact/Contact.jsx";

import Inscription from "./pages/inscription/Inscription.jsx";
import Connexion from "./pages/connexion/Connexion.jsx";

// ✅ AJOUT : Mot de passe oublié
import MotDePasseOublie from "./pages/connexion/MotDePasseOublie.jsx";

// ✅ AJOUT : Reset password
import ResetPassword from "./pages/connexion/ResetPassword.jsx";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import { API_BASE } from "./config/api";

import "./App.css";

function AppRoutes({
	authUser,
	setAuthUser,
	authMessage,
	setAuthMessage,
	authChecked,
	setAuthChecked,
}) {
	const navigate = useNavigate();
	const location = useLocation();

	const clearAuthMessage = useCallback(() => setAuthMessage(null), [setAuthMessage]);

	const isProtectedRoute = useCallback((pathname) => {
		return (
			pathname.startsWith("/admin") ||
			pathname.startsWith("/user") ||
			pathname.startsWith("/coursEtTutos") ||
			pathname.startsWith("/projets") ||
			pathname.startsWith("/cv-competences") ||
			pathname.startsWith("/contact")
		);
	}, []);

	const refreshAuth = useCallback(async () => {
		const protectedNow = isProtectedRoute(location.pathname);

		try {
			const res = await fetch(`${API_BASE}/check-auth.php`, {
				method: "GET",
				credentials: "include",
			});

			if (res.status === 401) {
				setAuthUser(null);
				setAuthChecked(true);

				if (protectedNow) {
					setAuthMessage("Session expirée (inactivité). Merci de vous reconnecter.");
					if (location.pathname !== "/connexion") navigate("/connexion");
				}
				return;
			}

			const data = await res.json();

			if (!data?.authenticated) {
				setAuthUser(null);
				setAuthChecked(true);

				if (protectedNow) {
					setAuthMessage("Session expirée. Merci de vous reconnecter.");
					if (location.pathname !== "/connexion") navigate("/connexion");
				}
				return;
			}

			setAuthUser(data.user);
			setAuthChecked(true);
		} catch {
			setAuthUser(null);
			setAuthChecked(true);

			if (protectedNow) {
				setAuthMessage("Impossible de vérifier la session. Merci de vous reconnecter.");
				if (location.pathname !== "/connexion") navigate("/connexion");
			}
		}
	}, [
		isProtectedRoute,
		location.pathname,
		navigate,
		setAuthChecked,
		setAuthMessage,
		setAuthUser,
	]);

	useIdleAuthPing(refreshAuth, { idleMs: 90_000 });

	const didInitAuth = useRef(false);

	useEffect(() => {
		if (didInitAuth.current) return;
		didInitAuth.current = true;
		refreshAuth();
	}, [refreshAuth]);

	return (
		<div className="d-flex flex-column min-vh-100">
			<Header
				authUser={authUser}
				refreshAuth={refreshAuth}
				clearAuthMessage={clearAuthMessage}
			/>

			<Routes>
				<Route path="/" element={<Body authUser={authUser} />} />

				<Route
					path="/admin"
					element={
						<ProtectedRoute requiredRole="admin" authUser={authUser} authChecked={authChecked}>
							<Admin />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/admin/cv-competences"
					element={
						<ProtectedRoute requiredRole="admin" authUser={authUser} authChecked={authChecked}>
							<Admin_CVCompetences authUser={authUser} />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/admin/coursEtTutos"
					element={
						<ProtectedRoute requiredRole="admin" authUser={authUser} authChecked={authChecked}>
							<AdminCoursEtTutos authUser={authUser} />
						</ProtectedRoute>
					}
				/>

				{/* ✅ admin chapitres ReactJS */}
				<Route
					path="/admin/coursEtTutos/reactjs/chapitres"
					element={
						<ProtectedRoute requiredRole="admin" authUser={authUser} authChecked={authChecked}>
							<Admin_Sommaire_ReactJs authUser={authUser} />
						</ProtectedRoute>
					}
				/>

				{/* ✅ admin chapitres PHP */}
				<Route
					path="/admin/coursEtTutos/php/chapitres"
					element={
						<ProtectedRoute requiredRole="admin" authUser={authUser} authChecked={authChecked}>
							<Admin_Sommaire_Php authUser={authUser} />
						</ProtectedRoute>
					}
				/>

				{/* ✅ admin chapitres Dart / Flutter */}
				<Route
					path="/admin/coursEtTutos/dart_flutter/chapitres"
					element={
						<ProtectedRoute requiredRole="admin" authUser={authUser} authChecked={authChecked}>
							<Admin_Sommaire_Dart_Flutter authUser={authUser} />
						</ProtectedRoute>
					}
				/>

				{/* ✅ admin chapitres Exercice Java SDBM */}
				<Route
					path="/admin/coursEtTutos/java_sdbm/chapitres"
					element={
						<ProtectedRoute requiredRole="admin" authUser={authUser} authChecked={authChecked}>
							<Admin_Sommaire_Exercice_Java_SDBM authUser={authUser} />
						</ProtectedRoute>
					}
				/>

				{/* ✅ admin chapitres Exercice Angular SDBM */}
				<Route
					path="/admin/coursEtTutos/angular-sdbm/chapitres"
					element={
						<ProtectedRoute requiredRole="admin" authUser={authUser} authChecked={authChecked}>
							<Admin_Sommaire_Exercice_Angular_SDBM authUser={authUser} />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/user"
					element={
						<ProtectedRoute requiredRole="user" authUser={authUser} authChecked={authChecked}>
							<User />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/coursEtTutos"
					element={
						<ProtectedRoute requiredRole="user" authUser={authUser} authChecked={authChecked}>
							<CoursEtTutos authUser={authUser} />
						</ProtectedRoute>
					}
				/>

				{/* ReactJS */}
				<Route
					path="/coursEtTutos/reactjs/sommaire"
					element={
						<ProtectedRoute requiredRole="user" authUser={authUser} authChecked={authChecked}>
							<Sommaire_ReactJs authUser={authUser} />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/coursEtTutos/reactjs/:chapterSlug"
					element={
						<ProtectedRoute requiredRole="user" authUser={authUser} authChecked={authChecked}>
							<Cours_ReactJs_Router authUser={authUser} />
						</ProtectedRoute>
					}
				/>

				{/* PHP */}
				<Route
					path="/coursEtTutos/php/sommaire"
					element={
						<ProtectedRoute requiredRole="user" authUser={authUser} authChecked={authChecked}>
							<Sommaire_Php authUser={authUser} />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/coursEtTutos/php/:chapterSlug"
					element={
						<ProtectedRoute requiredRole="user" authUser={authUser} authChecked={authChecked}>
							<Cours_Php_Router authUser={authUser} />
						</ProtectedRoute>
					}
				/>

				{/* ✅ Dart / Flutter (tiret bas) */}
				<Route
					path="/coursEtTutos/dart_flutter/sommaire"
					element={
						<ProtectedRoute requiredRole="user" authUser={authUser} authChecked={authChecked}>
							<Sommaire_Dart_Flutter authUser={authUser} />
						</ProtectedRoute>
					}
				/>

				{/* ✅ redirection /coursEtTutos/dart_flutter -> /sommaire */}
				<Route
					path="/coursEtTutos/dart_flutter"
					element={<Navigate to="/coursEtTutos/dart_flutter/sommaire" replace />}
				/>

				<Route
					path="/coursEtTutos/dart_flutter/:chapterSlug"
					element={
						<ProtectedRoute requiredRole="user" authUser={authUser} authChecked={authChecked}>
							<Cours_Dart_Flutter_Router authUser={authUser} />
						</ProtectedRoute>
					}
				/>

				{/* ✅ Exercice Java SDBM */}
				<Route
					path="/coursEtTutos/java_sdbm/sommaire"
					element={
						<ProtectedRoute requiredRole="user" authUser={authUser} authChecked={authChecked}>
							<Sommaire_Exercice_Java_SDBM authUser={authUser} />
						</ProtectedRoute>
					}
				/>

				{/* ✅ redirection /coursEtTutos/java_sdbm -> /sommaire */}
				<Route
					path="/coursEtTutos/java_sdbm"
					element={<Navigate to="/coursEtTutos/java_sdbm/sommaire" replace />}
				/>

				<Route
					path="/coursEtTutos/java_sdbm/:chapterSlug"
					element={
						<ProtectedRoute requiredRole="user" authUser={authUser} authChecked={authChecked}>
							<Exercice_Java_SDBM_Router authUser={authUser} />
						</ProtectedRoute>
					}
				/>

				{/* ✅ Exercice Angular SDBM (slug BDD = angular-sdbm) */}
				<Route
					path="/coursEtTutos/angular-sdbm/sommaire"
					element={
						<ProtectedRoute requiredRole="user" authUser={authUser} authChecked={authChecked}>
							<Sommaire_Exercice_Angular_SDBM authUser={authUser} />
						</ProtectedRoute>
					}
				/>

				{/* ✅ redirection /coursEtTutos/angular-sdbm -> /sommaire */}
				<Route
					path="/coursEtTutos/angular-sdbm"
					element={<Navigate to="/coursEtTutos/angular-sdbm/sommaire" replace />}
				/>

				<Route
					path="/coursEtTutos/angular-sdbm/:chapterSlug"
					element={
						<ProtectedRoute requiredRole="user" authUser={authUser} authChecked={authChecked}>
							<Exercice_Angular_SDBM_Router authUser={authUser} />
						</ProtectedRoute>
					}
				/>

				<Route path="/inscription" element={<Inscription />} />

				{/* ✅ Mot de passe oublié */}
				<Route path="/mot-de-passe-oublie" element={<MotDePasseOublie />} />

				{/* ✅ Reset password */}
				<Route path="/reset-password" element={<ResetPassword />} />

				<Route
					path="/connexion"
					element={
						<Connexion
							refreshAuth={refreshAuth}
							authMessage={authMessage}
							clearAuthMessage={clearAuthMessage}
						/>
					}
				/>

				<Route path="/projets" element={<Projets authUser={authUser} />} />
				<Route path="/cv-competences" element={<CVCompetences authUser={authUser} />} />
				<Route path="/contact" element={<Contact authUser={authUser} />} />
			</Routes>

			<Footer />
		</div>
	);
}

function App() {
	const [authUser, setAuthUser] = useState(null);
	const [authMessage, setAuthMessage] = useState(null);
	const [authChecked, setAuthChecked] = useState(false);

	return (
		<BrowserRouter>
			<AppRoutes
				authUser={authUser}
				setAuthUser={setAuthUser}
				authMessage={authMessage}
				setAuthMessage={setAuthMessage}
				authChecked={authChecked}
				setAuthChecked={setAuthChecked}
			/>
		</BrowserRouter>
	);
}

export default App;