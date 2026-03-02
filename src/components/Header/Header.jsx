import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import { API_BASE } from "../../config/api";
import "./Header_style.css";

function Header({ authUser, refreshAuth, clearAuthMessage }) {
	const scrollDirection = useScrollDirection();
	const location = useLocation();
	const navigate = useNavigate();
	const [show, setShow] = useState(false);

	const closeMenu = () => setShow(false);

	const isActive = (path) =>
		location.pathname === path || location.pathname.startsWith(path + "/");

	const handleLogout = async () => {
		try {
			await fetch(`${API_BASE}/logout.php`, {
				method: "POST",
				credentials: "include",
			});
		} catch (e) {
			console.error("Erreur logout:", e);
		} finally {
			closeMenu();
			await refreshAuth?.();
			navigate("/");
		}
	};

	const handleGoConnexion = () => {
		clearAuthMessage?.();
		closeMenu();
	};

	const handleGoInscription = () => {
		clearAuthMessage?.();
		closeMenu();
	};

	const handleGoHome = () => {
		clearAuthMessage?.();
		closeMenu();
	};

	return (
		<Navbar
			expand="lg"
			className={`dv-navbar border-bottom shadow-sm ${
				scrollDirection === "down" ? "header-hidden" : ""
			}`}
			fixed="top"
		>
			<Container fluid className="py-2 d-flex align-items-center position-relative">
				{/* Logo */}
				<Navbar.Brand
					as={RouterLink}
					to="/"
					className="fw-bold text-dark text-decoration-none"
					onClick={handleGoHome}
				>
					DV
				</Navbar.Brand>

				{/* Burger (mobile) */}
				<Navbar.Toggle aria-controls="main-nav" onClick={() => setShow(true)} />

				<Navbar.Offcanvas
					id="main-nav"
					placement="end"
					show={show}
					onHide={closeMenu}
				>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title>Menu</Offcanvas.Title>
					</Offcanvas.Header>

					<Offcanvas.Body className="d-flex align-items-center position-relative">
						{/* NAV CENTRÉE (desktop) */}
						<Nav className="d-none d-lg-flex position-absolute start-50 translate-middle-x">
							{/* Administration visible uniquement si admin */}
							{authUser?.role === "admin" && (
								<Nav.Link as={RouterLink} to="/admin" active={isActive("/admin")}>
									Administration
								</Nav.Link>
							)}

							<Nav.Link as={RouterLink} to="/" active={isActive("/")}>
								Accueil
							</Nav.Link>

							<Nav.Link as={RouterLink} to="/projets" active={isActive("/projets")}>
								Projets
							</Nav.Link>

							{/* ✅ Toujours public */}
							<Nav.Link
								as={RouterLink}
								to="/cv-competences"
								active={isActive("/cv-competences")}
							>
								CV / Compétences
							</Nav.Link>

							<Nav.Link
								as={RouterLink}
								to="/contact"
								active={isActive("/contact")}
							>
								Contact
							</Nav.Link>

							{/* Cours & Tutoriels : visible uniquement si connecté */}
							{authUser && (
								<Nav.Link
									as={RouterLink}
									to="/coursEtTutos"
									active={isActive("/coursEtTutos")}
								>
									Cours & Tutoriels
								</Nav.Link>
							)}
						</Nav>

						{/* NAV OFFCANVAS (mobile) */}
						<Nav className="d-lg-none w-100">
							{authUser?.role === "admin" && (
								<Nav.Link
									as={RouterLink}
									to="/admin"
									active={isActive("/admin")}
									onClick={closeMenu}
								>
									Administration
								</Nav.Link>
							)}

							<Nav.Link
								as={RouterLink}
								to="/"
								active={isActive("/")}
								onClick={handleGoHome}
							>
								Accueil
							</Nav.Link>

							<Nav.Link
								as={RouterLink}
								to="/projets"
								active={isActive("/projets")}
								onClick={closeMenu}
							>
								Projets
							</Nav.Link>

							{/* ✅ Toujours public */}
							<Nav.Link
								as={RouterLink}
								to="/cv-competences"
								active={isActive("/cv-competences")}
								onClick={closeMenu}
							>
								CV / Compétences
							</Nav.Link>

							<Nav.Link
								as={RouterLink}
								to="/contact"
								active={isActive("/contact")}
								onClick={closeMenu}
							>
								Contact
							</Nav.Link>

							{authUser && (
								<Nav.Link
									as={RouterLink}
									to="/coursEtTutos"
									active={isActive("/coursEtTutos")}
									onClick={closeMenu}
								>
									Cours & Tutoriels
								</Nav.Link>
							)}

							{/* Boutons (mobile) */}
							<div className="d-grid gap-2 mt-3">
								{authUser ? (
									<button className="btn btn-outline-danger" onClick={handleLogout}>
										Se déconnecter
									</button>
								) : (
									<>
										<RouterLink
											to="/connexion"
											className="btn btn-outline-primary"
											onClick={handleGoConnexion}
										>
											Connexion
										</RouterLink>

										<RouterLink
											to="/inscription"
											className="btn btn-primary text-decoration-none"
											onClick={handleGoInscription}
										>
											S'inscrire
										</RouterLink>
									</>
								)}
							</div>
						</Nav>

						{/* Boutons (desktop) */}
						<div className="ms-auto d-none d-lg-flex gap-2">
							{authUser ? (
								<button className="btn btn-danger text-white" onClick={handleLogout}>
									Se déconnecter
								</button>
							) : (
								<>
									<RouterLink
										to="/connexion"
										className="btn btn-outline-primary"
										onClick={handleGoConnexion}
									>
										Connexion
									</RouterLink>

									<RouterLink
										to="/inscription"
										className="btn btn-primary text-decoration-none"
										onClick={handleGoInscription}
									>
										S'inscrire
									</RouterLink>
								</>
							)}
						</div>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	);
}

export default Header;