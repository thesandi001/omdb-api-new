import { Component, OnInit } from '@angular/core';
import { MoviesComponent } from './movies-home/movies/movies.component';
import { MoviesService } from './services/movies.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Http, Headers } from '@angular/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private _movieService: MoviesService) {
  }

  ngOnInit() {
    this._movieService.removeFromLocal('lastSearchWord');
  }
}
