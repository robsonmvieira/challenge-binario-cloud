import { Store } from '@ngxs/store';
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { map, catchError } from 'rxjs/operators';
import { Movie } from "../models/movie.entity";
import { AuthState } from '../state/auth/auth.state';

export interface ResponseProps {
  status_code: number
  status_message: string
}

export interface MovieResponseProps {
  page: number
  results: any[]
  total_pages: number
  total_results: number
}

@Injectable({
  providedIn: 'root',
})

export class MovieService {
  poster_path_prefix = 'http://image.tmdb.org/t/p/w300/'
  constructor(private httpClient: HttpClient, private store: Store) {}

  getMovies(): Observable<Movie[]> {
    const url = `${environment.url_base}movie/now_playing?api_key=${environment.key}&language=${environment.lenguage}&page=1`
    return this.httpClient.get(url).pipe(
      map((response: any) => response.results = response.results.map((item: Movie) => ({...item, poster_path: `${this.poster_path_prefix}${item.poster_path}`}))),
      map((response: any) => {return response }),
      catchError((x: any) => throwError(x))
      )
  }

  findById(id: string): Observable<any> {
    const url = `${environment.url_base}movie/${id}?api_key=${environment.key}&language=${environment.lenguage}`
    return this.httpClient.get(url).pipe(
      map((response: any) => response = {...response, poster_path: `${this.poster_path_prefix}${response.poster_path}`}),
      map((response: any) => response ),
      catchError((x: any) => throwError(x))
      )
  }

  rateMovie(movieId: number, rate: number): Observable<ResponseProps> {
    const session_id = this.store.selectSnapshot(AuthState.token)
    const data = { value: rate }
    const url = `${environment.url_base}movie/${movieId}/rating?api_key=${environment.key}&guest_session_id=${session_id}`
    return this.httpClient.post(url, data).pipe(
      map((res: ResponseProps) => res),
      catchError((x: any) => throwError(x))
    )
  }

  ratedMovies(): Observable<any> {
    const session_id = this.store.selectSnapshot(AuthState.token)
    const url = `${environment.url_base}guest_session/${session_id}/rated/movies?api_key=${environment.key}&language=${environment.lenguage}&sort_by=created_at.desc`

    return this.httpClient.get(url).pipe(
      map((response: any) => response.results = response.results.map((item: Movie) => ({...item, poster_path: `${this.poster_path_prefix}${item.poster_path}`}))),
      map((response: any) => {return response }),
      catchError((x: any) => throwError(x))
    )
  }

  deleteRate(movieId: number): Observable<ResponseProps> {
    const session_id = this.store.selectSnapshot(AuthState.token)
    const url = `${environment.url_base}movie/${movieId}/rating?api_key=${environment.key}&guest_session_id=${session_id}`
    return this.httpClient.delete(url).pipe(
    map((response: any) => { return response }),
      catchError((x: any) => throwError(x))
    )
  }
}
