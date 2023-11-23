import axios from "axios";
import User from "../models/User.js";

import dotenv from "dotenv";

dotenv.config();

const TMDB_API_KEY = process.env.API_KEY;

const getMovies = async (req, res) => {
  try {
    const page = req.query.page || 1; // Default to page 1 if not provided

    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&page=${page}`
    );

    const movies = response.data.results.slice(0, 10);

    res.status(200).json({ movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTop5Movies = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&page=1`
    );

    const top5Movies = response.data.results.slice(0, 5);
    res.status(200).json({ top5Movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getFavorites = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Retrieve the user, including the details of their favoriteMovies
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const favoriteMovies = user.favoriteMovies;

    res.status(200).json({ favoriteMovies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addToFavorites = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.user.userId;

    // Check if the movie with the given movieId is already in favorites
    const user = await User.findById(userId);
    const isMovieInFavorites = user.favoriteMovies.some(
      (movie) => movie.movieId === movieId
    );

    if (isMovieInFavorites) {
      return res.status(400).json({ message: "Movie is already in favorites" });
    }

    // Fetch movie details from TMDb API using the provided movieId
    const tmdbApiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`;
    const response = await axios.get(tmdbApiUrl);

    // Extract relevant movie information from the API response
    const movieInfo = {
      movieId: Number(response.data.id),
      title: response.data.title,
      genre: response.data.genres.map((genre) => genre.name).join(", "),
      // Add more fields as needed
    };

    // Add the movieInfo object to the user's favoriteMovies array
    await User.findByIdAndUpdate(userId, {
      $push: { favoriteMovies: movieInfo },
    });

    console.log("Movie added to favorites:", movieInfo);

    res.status(200).json({ message: "Movie added to favorites successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const removeFromFavorites = async (req, res) => {
  try {
    const userId = req.user.userId;
    const movieId = req.params.id;
    console.log;

    // Check if the movie with the given movieId is in favorites
    const user = await User.findById(userId);
    const isMovieInFavorites = user.favoriteMovies.some(
      (movie) => movie.movieId.toString() === movieId
    );

    if (!isMovieInFavorites) {
      return res.status(404).json({ message: "Movie not found in favorites" });
    }

    // Remove the movie with the given movieId from favorites
    await User.findByIdAndUpdate(userId, {
      $pull: { favoriteMovies: { movieId: movieId } },
    });

    res.status(200).json({ message: "Movie removed from favorites" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchMovies = async (req, res) => {
  try {
    const query = req.query.search;

    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`
    );

    const searchResults = response.data.results;
    res.status(200).json({ searchResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMovieDetails = async (req, res) => {
  try {
    const movieId = req.params.id;

    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`
    );

    const movieDetails = response.data;
    res.status(200).json({ movieDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMovieTrailer = async (req, res) => {
  try {
    const movieId = req.params.id;

    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`
    );

    const videos = response.data.results;

    const trailer = videos.find((video) => video.type === "Trailer");

    if (!trailer) {
      return res.status(404).json({ error: "Trailer not found" });
    }

    res.status(200).json({ trailer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export {
  getMovies,
  getTop5Movies,
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  searchMovies,
  getMovieDetails,
  getMovieTrailer,
};
