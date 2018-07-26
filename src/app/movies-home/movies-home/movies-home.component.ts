import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieSearchComponent } from '../movie-search/movie-search.component';
import { MoviesSeachModel } from '../../data-models/movie-search.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';

@Component({
  selector: 'app-movies-home',
  templateUrl: './movies-home.component.html',
  styleUrls: ['./movies-home.component.css']
})
export class MoviesHomeComponent implements OnInit {

  @ViewChild(MovieSearchComponent) movieSearchComponent;
  @ViewChild(MovieDetailComponent) movieDetailComponent;
  @Input() searchResults: MoviesSeachModel[] ;
  public isSearchClicked: boolean;
  public movieSearchResults: MoviesSeachModel;
  public isLoading: boolean;
  public enableSpinner: boolean;

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.isSearchClicked = false;
    this.spinner.hide();

  }

  AfterViewInit() {
    this.isSearchClicked = this.movieSearchComponent.isSearchClicked ;
    this.isLoading = this.movieSearchComponent.isLoading ;
    this.enableSpinner = this.movieSearchComponent.enableSpinner ;
    if (this.enableSpinner) {
      this.spinner.show();
    }
    this.movieSearchResults = this.movieSearchComponent.moviesResponse;
  }

  receiveSearchResponse($eventSearchResponse) {
    this.movieSearchResults = $eventSearchResponse;
    console.log( this.movieSearchResults);
    this.isSearchClicked = true ;
  }

}
