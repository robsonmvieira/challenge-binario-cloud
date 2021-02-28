import { MovieService } from './../../services/movie.service';
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { MovieStateProps } from "./movie-props.state";
import { GetAllMovies, GetMovie, GetRatedMovies, RateMovie, RemoveRateMovie, SetMovieSelected } from './movie.action';
import { map } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie.entity';

@State<MovieStateProps>({
  name: 'movies',
  defaults: {
    movies: [],
    movies_rates: [],
    selected_movie: null
  }
})


@Injectable()
export class MovieState {

  constructor(private movieService: MovieService) {}

  @Selector()
  static allMovies(ctx: MovieStateProps): Movie[] {
    return ctx.movies
  }

  @Selector()
  static ratedMovies(ctx: MovieStateProps): Movie[] {
    return ctx.movies_rates
  }

  @Selector()
  static allRatedMoviesLength(ctx: MovieStateProps): number {
    return ctx.movies_rates.length
  }

  @Selector()
  static allMoviesLength(ctx: MovieStateProps): number {
    return ctx.movies.length
  }

  @Selector()
  static getSelectedMovie(ctx: MovieStateProps): Movie | null {
    return ctx.selected_movie
  }

  @Action(GetAllMovies)
  getAllMovies(ctx: StateContext<MovieStateProps>) {
    return this.movieService.getMovies().pipe(
      map( response => {
        const state = ctx.getState()
        ctx.patchState({
          ...state, movies: [...response.sort((a, b) => (a.vote_average < b.vote_average) ? 1: -1)]
        })
      })
    )
  }

  @Action(GetRatedMovies)
  getRatedMovies(ctx: StateContext<MovieStateProps>) {
    return this.movieService.ratedMovies().pipe(
      map( response => {
        const state = ctx.getState()
        ctx.patchState({
          ...state, movies_rates: [...response]
        })
      }),
    )
  }

  @Action(SetMovieSelected)
  SetkMovieAsSelected(ctx: StateContext<MovieStateProps>, action: SetMovieSelected) {
    const state = ctx.getState()
    ctx.patchState({
      ...state, selected_movie: action.payload
    })
  }

  @Action(GetMovie)
  GetkMovie(ctx: StateContext<MovieStateProps>, action: GetMovie) {
    return this.movieService.findById(action.payload).subscribe(response => {
      const state = ctx.getState()
      ctx.patchState({
        ...state, selected_movie: response
      })

    })
  }

  @Action(RateMovie)

  sendRateMovie(ctx: StateContext<MovieStateProps>, action: RateMovie) {
    return this.movieService.rateMovie(action.id, action.rate).subscribe( () => {
      const state = ctx.getState()
      const movie = state.movies.find(movie => movie.id === action.id)
      ctx.patchState({
        ...state, movies_rates: [...state.movies_rates, movie]
      })
    })
  }

  @Action(RemoveRateMovie)
  cancelRateMovie(ctx: StateContext<MovieStateProps>, action: RemoveRateMovie) {
    return this.movieService.deleteRate(action.id).pipe(
      map( () => {
        const state = ctx.getState()
        ctx.patchState({
          ...state, movies_rates: state.movies_rates.filter(x => x.id !== action.id)
        })
      })
    )
  }
}
