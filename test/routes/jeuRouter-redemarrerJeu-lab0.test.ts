// Vous devez insérer les nouveaux tests ici
import supertest from "supertest";
import { assert } from "console";
import "jest-extended";
import app from "../../src/app";
import { jeuRoutes } from "../../src/routes/jeuRouter";

const request = supertest(app);

const testNom1 = "Jean-Marc";
const testNom2 = "Pierre";

describe("redemarrerJeu.test.ts", () => {
  describe("GET /api/v1/jeu/redemarrerJeu", () => {
    beforeAll(async () => {
      await request.post("/api/v1/jeu/demarrerJeu").send({ nom: testNom1 });
      await request.post("/api/v1/jeu/demarrerJeu").send({ nom: testNom2 });
    });

    it("devrait répondre avec succès que la connexion avec l'api c'est fait.", async () => {
      const response = await request.get('/api/v1/jeu/redemarrerJeu');
      expect(response.status).toBe(200);
      expect(response.type).toBe("application/json");
    });

    it(`devrait répondre avec succès qu'il y a pu aucun joueur.`, async () => {
      const joueursJSON = jeuRoutes.controleurJeu.joueurs;
      const joueursArray = JSON.parse(joueursJSON);
      expect(joueursArray.length).toBe(0);
    });

    it("devrait retourner une erreur 404 quand on essaye de jouer après avoir redémarré le jeu.", async () => {
      await request.get("/api/v1/jeu/redemarrerJeu");
      const response = await request.get("/api/v1/jeu/jouer/");
      expect(response.status).toBe(404);
    });
  });
});
