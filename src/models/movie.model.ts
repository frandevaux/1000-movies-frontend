import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  genres: {
    type: Array,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  original_language: {
    type: String,
    required: true,
  },
  original_title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  release_date: {
    type: String,
    required: true,
  },
  cast: {
    type: Array,
    required: true,
  },
  director: {
    type: Object,
    required: true,
  },
  seen: {
    type: Boolean,
    required: true,
  },
  seen_date: {
    type: Date,
    required: false,
  },
  list_id: {
    type: Number,
    required: true,
  },
});

export const Movie =
  mongoose.models.Movie || mongoose.model("Movie", movieSchema);

export default Movie;
