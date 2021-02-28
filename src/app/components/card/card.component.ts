import { Movie } from './../../models/movie.entity';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { SetMovieSelected } from 'src/app/state/movies/movie.action';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() movie: Movie

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
  }

  goToDetail() {
    this.store.dispatch( new SetMovieSelected(this.movie))
   this.router.navigate(['/movies/', this.movie.id])
  }
}
