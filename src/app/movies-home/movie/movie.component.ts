import { Component, OnInit, Input, Inject } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { RouterModule, Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import {MatIconRegistry, MatButton} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MovieModel } from '../../data-models/movie.model';
import { MovieDetailModel } from '../../data-models/movie-detail.model';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Input() public movie: MovieModel;
  @Input() public iconColor: string ;

  public movieDetails: MovieDetailModel[];
  public isLoading: boolean;
  public imdbID: string ;
  public likeIconSrc = './../../../assets/img/like.svg' ;
  public unLikeIconSrc = './../../../assets/img/unlike.svg';
  public svgIcon: string ;
  public storedKeys: string[]; // existing liked movies in local storage

  constructor(private activatedRoute: ActivatedRoute,
  private _movieService: MoviesService, private router: Router,
  iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('./../../../assets/img/like.svg'));
      iconRegistry.addSvgIcon(
        'thumbs-down',
        sanitizer.bypassSecurityTrustResourceUrl('./../../../assets/img/unlike.svg'));
}

  ngOnInit() {
    this.storedKeys = this._movieService.getAllKeys(); // get all liked movies array
    this.iconColor = 'warn';
    this.iconColor = this.storedKeys.includes(this.movie.imdbID) ? 'primary' : 'warn' ;
    this.imdbID = this.movie.imdbID ;
    this.svgIcon = this.likeIconSrc;
  }

  private onMovieClick = () => {
    this.getMovieByID(this.imdbID);
    this.router.navigate(['movies/' + this.imdbID]);
  }

  private getMovieByID = (imdbID: string) => {
    this._movieService.getMovieByID(imdbID).
      subscribe(res => {
        this.movieDetails = res;
      },
        err => console.error(err),
        () => {
          console.log('done loading movie details');
          this.isLoading = false;
        });
  }

  public onLikebtnClick = (imdbID: string) => {
      if (this.iconColor === 'warn') { // save to local storage during like
         this._movieService.saveInLocal(imdbID, imdbID);
      } else { // remove from local storage during unlike
        this._movieService.removeFromLocal(imdbID);
      }
      this.toggleColor(this.iconColor); // change like/unlike button color
  }

  private toggleColor = (iconColor: string) => {
    this.iconColor = iconColor === 'warn' ? 'primary' : 'warn' ;
  }



}
