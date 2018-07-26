import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { movieRoot } from './movies-home-routing.module';
import { MoviesHomeComponent } from './movies-home.component';
import { AboutComponent } from '../about/about.component';
import { MovieComponent } from '../movie/movie.component';
import { MoviesComponent } from '../movies/movies.component';
import { MovieSearchComponent } from '../movie-search/movie-search.component';
import { RouterModule } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { HttpErrorHandler } from '../../services/http-error-handler.service';
import { MessageService } from '../../services/message.service';
import {MatButtonModule, MatProgressSpinnerModule,
  MatCardModule, MatAutocompleteModule, MatInputModule, MatIconModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    movieRoot,
    MatCardModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [MoviesHomeComponent,
  AboutComponent,
  MovieComponent,
  MoviesComponent,
  MovieSearchComponent],
  providers: [MoviesService,
    HttpErrorHandler,
    MessageService],
  exports: [MoviesHomeComponent]
})
export class MoviesHomeModule { }
