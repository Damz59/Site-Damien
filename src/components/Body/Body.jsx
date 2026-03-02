import { Container, Row, Col } from "react-bootstrap";

import News from "../News/News.jsx";
import Intro from "../Intro/Intro.jsx";
import Section from "../Section/Section.jsx";
import Banniere from "../Banniere/Banniere.jsx";
import BanniereIsConnected from "../Banniere_isConnected/Banniere_isConnected";

function Body({ authUser }) {
	return (
		<main className="flex-grow-1 overflow-auto">
			<Banniere />

			{/* Espace entre les 2 bannières */}
			{authUser && (
				<div className="mt-3">
					<BanniereIsConnected authUser={authUser} />
				</div>
			)}

			<Container className="my-5">
				<Row>
					<Col lg={9}>
						<h1 className="display-3 border-bottom border-1 border-dark pb-2 d-inline-block">
							Bienvenue sur mon site !
						</h1>

						<News />
						<Intro />
					</Col>

					<Col lg={3}>
						<Section />
					</Col>
				</Row>
			</Container>
		</main>
	);
}

export default Body;