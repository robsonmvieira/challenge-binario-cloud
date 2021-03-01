import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie.entity';
import { Login, SetToken } from 'src/app/state/auth/auth.action';
import { AuthState } from 'src/app/state/auth/auth.state';
import { GetMovie, GetRatedMovies, RateMovie, RemoveRateMovie } from 'src/app/state/movies/movie.action';
import { MovieState } from 'src/app/state/movies/movie.state';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})

export class MovieDetailComponent implements OnInit {
  rate: number = null;
  @Select(MovieState.getSelectedMovie)
  movie$: Observable<Movie>

  @Select(AuthState.isLogged)
  userAuthenticated: Observable<boolean>

  movieId: number = 0
  alreadyAvaliabled = false

  constructor(
    private toastrService: ToastrService,
    private store: Store,
    private route:ActivatedRoute){}


  ngOnInit(): void {
    this.store.dispatch( new GetRatedMovies())
    const { id } = this.route.snapshot.params
    this.movieId = id

    this.movie$.subscribe(movie => {
      if(movie === null) {
        this.store.dispatch( new GetMovie(id))
      }
    })


    this.userAuthenticated.subscribe(response => {
      if(!response) {
        const token = localStorage.getItem('@token')
        if(token) {
          this.store.dispatch(new SetToken(token))
        } else {
          this.store.dispatch(new Login())
        }
      }
    })

    const ratedMovies = this.store.selectSnapshot(MovieState.ratedMovies);
    this.alreadyAvaliabled = !!ratedMovies.find(movie => movie.id === Number(this.movieId))
  }

  sendRate() {
    if(this.rate > 10) {
      this.toastrService.error('Valor da nota Maior do que o permitido', 'error no valor da Avaliação.')
      return
    }

    const correctValueFormat = this.rate % 1 * 10
    if(Number(correctValueFormat) !== 0 && Number(correctValueFormat) !== 5) {
      this.toastrService.error('Valor da nota  de avaliação está no formato incorreto', 'error no valor da Avaliação.')
      return
    }
    this.store.dispatch(new RateMovie(this.movieId, this.rate)).subscribe(() => this.store.dispatch( new GetRatedMovies()))
    this.toastrService.success('Avaliação criada com sucesso', 'Avaliação enviada.')
    this.rate = null

  }

  removeRate() {
    const movie = this.store.selectSnapshot(MovieState.getSelectedMovie)
    this.store.dispatch( new RemoveRateMovie(movie.id))
  }

}
