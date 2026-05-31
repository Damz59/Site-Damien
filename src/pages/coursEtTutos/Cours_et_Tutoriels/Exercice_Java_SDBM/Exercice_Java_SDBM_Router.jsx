import { useParams, Link } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";
import Banniere from "../../../../components/Banniere/Banniere.jsx";
import BanniereIsConnected from "../../../../components/Banniere_isConnected/Banniere_isConnected.jsx";

import Chapitre_01_Java_SDBM_Creation_du_Projet from "./chapitres/Chapitre_01_Java_SDBM_Creation_du_Projet.jsx";
import Chapitre_02_Java_SDBM_Creation_des_entites from "./chapitres/Chapitre_02_Java_SDBM_Creation_des_entites.jsx";
import Chapitre_03_Java_SDBM_Relations_JPA from "./chapitres/Chapitre_03_Java_SDBM_Relations_JPA.jsx";
import Chapitre_04_Java_SDBM_Creation_des_autres_entites from "./chapitres/Chapitre_04_Java_SDBM_Creation_des_autres_entites.jsx";
import Chapitre_05_Java_SDBM_Creation_CRUD from "./chapitres/Chapitre_05_Java_SDBM_Creation_CRUD.jsx";
import Chapitre_06_Java_SDBM_Validation_Gestion_Erreurs from "./chapitres/Chapitre_06_Java_SDBM_Validation_Gestion_Erreurs.jsx";

export default function Cours_Exercice_Java_SDBM_Router({ authUser }) {
    const { chapterSlug } = useParams();

    const registry = {
        "creation-du-projet": Chapitre_01_Java_SDBM_Creation_du_Projet,
        "creation-des-entites": Chapitre_02_Java_SDBM_Creation_des_entites,
        "relations-jpa": Chapitre_03_Java_SDBM_Relations_JPA,
        "creation-des-autres-entites": Chapitre_04_Java_SDBM_Creation_des_autres_entites,
        "creation-crud": Chapitre_05_Java_SDBM_Creation_CRUD,
        "validation-gestion-erreurs": Chapitre_06_Java_SDBM_Validation_Gestion_Erreurs
    };

    const ChapterComponent = registry[chapterSlug];

    if (!ChapterComponent) {
        return (
        <main className="flex-grow-1 overflow-auto">
            <Banniere />
            {authUser && (
            <div className="mt-3">
                <BanniereIsConnected authUser={authUser} />
            </div>
            )}

            <Container className="my-5">
            <h1 className="mb-3">Exercice Java SDBM — Chapitre introuvable</h1>
            <Alert variant="warning">
                Aucun chapitre ne correspond à : <strong>{chapterSlug}</strong>
            </Alert>
            <Link className="btn btn-outline-secondary btn-sm" to="/coursEtTutos/java_sdbm/sommaire">
                ← Retour Sommaire Exercice Java SDBM
            </Link>
            </Container>
        </main>
        );
    }

    return <ChapterComponent authUser={authUser} />;
}