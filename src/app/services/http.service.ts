import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoviesSeachModel } from './../data-models/movie-search.model';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpService {

  private handleError: HandleError;
  private apiUrl: string = environment.api_url ;
  private apiKey = '42e7c341';

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
    }

  private getSearchedMovies = (searchString: string): Observable<MoviesSeachModel[]> => {
    return this.http.get<MoviesSeachModel[]>(this.apiUrl + 'apikey=' + this.apiKey + '&s=' + searchString)
    .pipe(
      catchError(this.handleError('getHeroes', []))
    );
  }
}
