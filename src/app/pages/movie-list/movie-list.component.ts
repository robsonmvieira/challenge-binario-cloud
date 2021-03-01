import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.entity';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { MovieState } from 'src/app/state/movies/movie.state';
import { Observable } from 'rxjs';
import { GetAllMovies, SetMovieSelected } from 'src/app/state/movies/movie.action';
import { SetToken, Login } from 'src/app/state/auth/auth.action';
import { AuthState } from 'src/app/state/auth/auth.state';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  @Select(MovieState.allMovies)
  movies$: Observable<Movie[]>


  @Select(AuthState.isLogged)
  userAuthenticated: Observable<boolean>

  constructor(
    private store: Store,
    private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(new GetAllMovies())

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
  }

 goToDetail(movie: Movie) {
   this.store.dispatch( new SetMovieSelected(movie))
  this.router.navigate(['/movies/', movie.id])
 }


}
// setar
