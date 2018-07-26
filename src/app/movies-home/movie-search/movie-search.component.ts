import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, empty } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MoviesService } from './../../services/movies.service';
import { MoviesSeachModel } from '../../data-models/movie-search.model';


@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  movieSearchCtrl: FormControl;
  filteredMovies: Observable<any[]>;
  autoSearchResults: any; // future dev task: auto load of movies while typing
  private moviesResponse: MoviesSeachModel[];
  private isLoading: boolean;
  private enableSpinner: boolean;
  private searchWord: string;
  private isSearchClicked: boolean;

  @Output() searchResponseEvent = new EventEmitter<MoviesSeachModel[]>();

  constructor(private _movieService: MoviesService) {
    this.movieSearchCtrl = new FormControl();
  }
  ngOnInit() {
    this.isLoading = true;
    this.isSearchClicked = false;
    this.enableSpinner = false;
    this.searchWord = this._movieService.getFromLocal('lastSearchWord');
    if (this.searchWord) {
      this.searchMovies(this.searchWord);
      this.isSearchClicked = true;
    }
  }

  private onSearchClick = (searchWord: string) => {
    this.isSearchClicked = true;
    this._movieService.saveInLocal('lastSearchWord', searchWord);
    this.searchMovies(searchWord);
  }

  // search movies
  private searchMovies = (searchString: string) => {
    this._movieService.getSearchedMovies(searchString).
      subscribe(res => {
        this.moviesResponse = res;
      },
        err => console.error(err),
        () => {
          console.log('done loading movies');
          this.isLoading = false;
          this.searchResponseEvent.emit(this.moviesResponse );
          this.enableSpinner = false;
        });
  }

  }


