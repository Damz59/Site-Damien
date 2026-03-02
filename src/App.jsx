import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
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

import User from "./pages/user/User.jsx";
import Projets from "./pages/projets/Projets.jsx";
import CVCompetences from "./pages/cvcompetences/CVCompetences.jsx";
import Contact from "./pages/contact/Contact.jsx";
import Inscription from "./pages/inscription/Inscription.jsx";
import Connexion from "./pages/connexion/Connexion.jsx";
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

				{/* ✅ AJOUT : admin chapitres ReactJS */}
				<Route
					path="/admin/coursEtTutos/reactjs/chapitres"
					element={
						<ProtectedRoute requiredRole="admin" authUser={authUser} authChecked={authChecked}>
							<Admin_Sommaire_ReactJs authUser={authUser} />
						</ProtectedRoute>
					}
				/>

				{/* ✅ AJOUT : admin chapitres PHP */}
				<Route
					path="/admin/coursEtTutos/php/chapitres"
					element={
						<ProtectedRoute requiredRole="admin" authUser={authUser} authChecked={authChecked}>
							<Admin_Sommaire_Php authUser={authUser} />
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

				<Route
					path="/coursEtTutos/php/sommaire"
					element={
						<ProtectedRoute requiredRole="user" authUser={authUser} authChecked={authChecked}>
							<Sommaire_Php authUser={authUser} />
						</ProtectedRoute>
					}
				/>

				{/* ✅ AJOUT : chapitres PHP (user) */}
				<Route
					path="/coursEtTutos/php/:chapterSlug"
					element={
						<ProtectedRoute requiredRole="user" authUser={authUser} authChecked={authChecked}>
							<Cours_Php_Router authUser={authUser} />
						</ProtectedRoute>
					}
				/>

				<Route path="/inscription" element={<Inscription />} />

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