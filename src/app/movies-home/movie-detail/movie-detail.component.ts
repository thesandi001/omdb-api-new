import { Component, OnInit, Input } from '@angular/core';
import {MatIconRegistry, MatButton} from '@angular/material';
import {Location} from '@angular/common';

import { MovieDetailModel } from '../../data-models/movie-detail.model';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-detail',
  providers: [Location],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  @Input() private iconColor: string ;
  private movie: MovieDetailModel[] ;
  private isLoading: boolean;
  private imdbID: string ;
  private likeIconSrc = './../../../assets/img/like.svg' ;
  private unLikeIconSrc = './../../../assets/img/unlike.svg';
  private svgIcon: string ;
  private storedKeys: string[]; // local storage liked movies


  constructor(private router: ActivatedRoute,
    private _movieService: MoviesService,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private _location: Location) {
      iconRegistry.addSvgIcon(
        'thumbs-up',
        sanitizer.bypassSecurityTrustResourceUrl('./../../../assets/img/like.svg'));
        iconRegistry.addSvgIcon(
          'thumbs-down',
          sanitizer.bypassSecurityTrustResourceUrl('./../../../assets/img/unlike.svg'));
  }


  ngOnInit() {
    this.isLoading = true;
    this.storedKeys = this._movieService.getAllKeys(); // get liked movies
    this.iconColor = 'warn';
    this.svgIcon = this.likeIconSrc;
    this.router.params.subscribe((params) => {
      this.imdbID = params['id'];
      this.iconColor = this.storedKeys.includes(this.imdbID) ? 'primary' : 'warn' ;
      this._movieService.getMovieByID(this.imdbID).
        subscribe(res => {
          this.movie = res;
        },
          err => console.error(err),
          () => {
            console.log('done loading movie details');
            this.isLoading = false;
          });
  });
}

private onBackClick = () => {
  this._location.back();
}

private onLikebtnClick = (imdbID: string) => {
  if (this.iconColor === 'warn') { // save to local storage on like
     this._movieService.saveInLocal(imdbID, imdbID);
  } else { // unsave from local storage on unlike
    this._movieService.removeFromLocal(imdbID);
  }
  this.toggleColor(this.iconColor);
}

private toggleColor = (iconColor: string) => {
this.iconColor = iconColor === 'warn' ? 'primary' : 'warn' ;
}

}
