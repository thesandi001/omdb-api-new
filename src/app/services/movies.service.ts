import { Injectable, OnInit, Inject } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { MoviesSeachModel } from '../data-models/movie-search.model';
import { environment } from './../../environments/environment';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { MovieDetailModel } from '../data-models/movie-detail.model';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

// service class for all api requests to imdb open Apis
@Injectable()
export class MoviesService {
  private apiKey: string;
  private movieSearchResponse: MoviesSeachModel;
  private apiUrl: string;
  private handleError: HandleError;
  private search_api_url: string;
  public data: string[];
  public storedKeys: string[];

  constructor(
    private _httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) {
    this.handleError = httpErrorHandler.createHandleError('MovieService');
    this.apiUrl = environment.api_url;
    this.apiKey = environment.apiKey;
    this.search_api_url = environment.search_api_url;
    this.data = [];
    this.storedKeys = [];
  }

  public getSearchedMovies = (
    searchString: string
  ): Observable<MoviesSeachModel[]> => {
    return this._httpClient
      .get<MoviesSeachModel[]>(
        this.apiUrl + 'apikey=' + this.apiKey + '&s=' + searchString
      )
      .pipe(catchError(this.handleError('getSearchedMovies', [])));
  }

  public getMovieByID = (imdbID: string): Observable<MovieDetailModel[]> => {
    return this._httpClient
      .get<MovieDetailModel[]>(
        this.apiUrl + 'apikey=' + this.apiKey + '&i=' + imdbID
      )
      .pipe(catchError(this.handleError('getMovieByID', [])));
  }

  // Functions for interacting with local storage
  public saveInLocal = (key, val): void => {
    console.log('recieved= key:' + key + 'value:' + val);
    this.storage.set(key, val);
    this.data.push(key);
  }

  public getFromLocal = (key): string => {
    console.log('recieved= key:' + key);
    return this.storage.get(key);
  }

  public removeFromLocal = (key): void => {
    console.log('recieved= key:' + key);
    this.storage.remove(key);
  }

  public getAllKeys = (): string[] => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      this.storedKeys.push(key);
    }
    return this.storedKeys;
  }
}
