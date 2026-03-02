import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function normalizeRole(role) {
	const r = (role || "").toString().trim().toLowerCase();
	// Pour l’instant : moderator = user
	if (r === "moderator") return "user";
	return r;
}

function hasRequiredRole(userRole, requiredRole) {
	if (!requiredRole) return true;

	const role = normalizeRole(userRole);
	const required = normalizeRole(requiredRole);

	// Si la page demande "user", on accepte user + admin
	if (required === "user") {
		return role === "user" || role === "admin";
	}

	// Si la page demande "admin", on accepte admin seulement
	if (required === "admin") {
		return role === "admin";
	}

	// fallback
	return role === required;
}

export default function ProtectedRoute({ children, requiredRole, authUser, authChecked }) {
	const location = useLocation();

	// Tant qu'on n'a pas vérifié l'auth, on affiche un loader
	if (!authChecked) {
		return (
			<div className="text-center my-5">
				<Spinner />
			</div>
		);
	}

	// Pas connecté -> connexion + mémorise la page demandée
	if (!authUser) {
		return <Navigate to="/connexion" replace state={{ from: location.pathname }} />;
	}

	// Connecté mais rôle insuffisant -> accueil (ou mets "/user" si tu préfères)
	if (!hasRequiredRole(authUser.role, requiredRole)) {
		return <Navigate to="/" replace />;
	}

	return children;
}