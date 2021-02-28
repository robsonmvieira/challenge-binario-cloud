import { Movie } from "src/app/models/movie.entity";

export interface MovieStateProps {
  movies: Movie[]
  movies_rates: Movie[],
  selected_movie: Movie
}
