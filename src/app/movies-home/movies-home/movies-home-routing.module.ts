import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './../about/about.component';
import { MovieComponent } from './../movie/movie.component';
import { MoviesComponent } from './../movies/movies.component';
import { MovieSearchComponent } from './../movie-search/movie-search.component';
import { MoviesHomeComponent } from './movies-home.component';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';


export const moviesRoutes: Routes = [
  { path: 'movies/:id', component: MovieDetailComponent }
];

export const movieRoot = RouterModule.forRoot(moviesRoutes);
