import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AddMovieRequest } from './../../_shared/messages/add-movie-request.model';
import { MovieService } from './../../_shared/datagateway/movie-service';
import { Movie } from 'src/_shared/models/movies.model';

@Component({
  selector: 'mrapp-movies-add',
  templateUrl: './movies-add.component.html',
  styleUrls: ['./movies-add.component.scss']
})
export class MoviesAddComponent implements OnInit {

  public fg: FormGroup;
  public submitted = false;
  public loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.fg = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      copyCode: ['', [Validators.required]],
      registrationId: ['', [Validators.required]]
    });


  }

  async onSubmit() {
    this.submitted = true;

    if (this.fg.invalid || this.loading) {
      return;
    }
    this.loading = true;

    let addMovieRequest = new Movie();
    addMovieRequest.copyCode = this.getForm['copyCode'].value;
    addMovieRequest.title = this.getForm['title'].value;
    addMovieRequest.registrationId = this.getForm['registrationId'].value;

    try {
      let _movies = await this.movieService.getMovies().toPromise();
      //check if registrationId matched with title
      let _movieRegistrationId = _movies.filter(movie => movie.registrationId === addMovieRequest.registrationId);
      if (_movieRegistrationId.length >= 1) {
        //check if title exists in registration id
        let _movieTitle = _movieRegistrationId.find(movie => movie.title === addMovieRequest.title);
        if (!_movieTitle) {
          this.loading = false;
          this.snackBar.open("Title and registration id does not match.", null, { duration: 2000 });
          return;

        }
        //check if copyCode exists
        let _copyCode = _movieRegistrationId.find(movie => movie.copyCode === addMovieRequest.copyCode);
        if (_copyCode) {
          this.loading = false;
          this.snackBar.open("Duplicate Copy Code.", null, { duration: 2000 });
          return;
        }
      }

      (await this.movieService.add(addMovieRequest)).subscribe(
        response => {
          this.loading = false;
          this.snackBar.open("Movie added!", null, { duration: 2000 });
        },
        error => {
          this.loading = false;
          this.snackBar.open(error, null, { duration: 2000 });
        }
      );
    } catch (error) {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
      console.log(error);
    }

  }

  get getForm() { return this.fg.controls; }



}
