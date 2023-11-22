import express from "express";
import {
  getMovies,
  getTop5Movies,
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  searchMovies,
  getMovieDetails,
  getMovieTrailer,
} from "../controllers/movieController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyToken);

router.get("/", getMovies);
router.get("/top5movies", getTop5Movies);
router.get("/favorites", getFavorites);
router.post("/favorites/add", addToFavorites);
router.delete("/favorites/remove/:id", removeFromFavorites);
router.get("/search", searchMovies);
router.get("/details/:id", getMovieDetails);
router.get("/trailer/:id", getMovieTrailer);

export default router;
