import { RatedVideoListComponentComponent } from './pages/rated-video-list-component/rated-video-list-component.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './infra/routes/app.routes';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';

const routes: Routes = [

  {
    path: appRoutes.movies.ratedVideos,
    component: RatedVideoListComponentComponent
  },
  {
    path: appRoutes.movies.movieById,
    component: MovieDetailComponent
  },
  {
    path: appRoutes.movies.root,
    component: MovieListComponent
  },
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
