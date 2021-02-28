import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie.entity';
import { SetToken, Login } from 'src/app/state/auth/auth.action';
import { AuthState } from 'src/app/state/auth/auth.state';
import { GetRatedMovies } from 'src/app/state/movies/movie.action';
import { MovieState } from 'src/app/state/movies/movie.state';

@Component({
  selector: 'app-rated-video-list-component',
  templateUrl: './rated-video-list-component.component.html',
  styleUrls: ['./rated-video-list-component.component.scss']
})
export class RatedVideoListComponentComponent implements OnInit {

  @Select(MovieState.ratedMovies)
  movies$: Observable<Movie[]>

  @Select(AuthState.isLogged)
  userAuthenticated: Observable<boolean>

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {

    this.userAuthenticated.subscribe(response => {
      if(!response) {
        const token = localStorage.getItem('@token')
        if(token) {
          this.store.dispatch(new SetToken(token))
          this.store.dispatch( new GetRatedMovies())
        } else {
          this.store.dispatch(new Login())
          this.router.navigateByUrl('/movies')
        }
      } else {
        this.store.dispatch( new GetRatedMovies())
      }
    })
  }

}
