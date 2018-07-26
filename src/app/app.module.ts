import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import {
  MatButtonModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatAutocompleteModule,
  MatInputModule,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatToolbarModule,
  MatIconModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageServiceModule } from 'angular-webstorage-service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { appRoute } from './app.routes';
import { AboutComponent } from './movies-home/about/about.component';
import { MoviesComponent } from './movies-home/movies/movies.component';
import { MovieComponent } from './movies-home/movie/movie.component';
import { MoviesService } from './services/movies.service';
import { CommonLayoutModule } from './common-layout/common-layout.module';
import { MovieSearchComponent } from './movies-home/movie-search/movie-search.component';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';
import { MoviesHomeModule } from './movies-home/movies-home/movies-home.module';
import { MoviesHomeComponent } from './movies-home/movies-home/movies-home.component';
import { MovieDetailComponent } from './movies-home/movie-detail/movie-detail.component';

@NgModule({
  declarations: [AppComponent, MovieDetailComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxSpinnerModule,
    JsonpModule,
    RouterModule,
    appRoute,
    CommonLayoutModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MoviesHomeModule,
    StorageServiceModule,
    AngularFontAwesomeModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
