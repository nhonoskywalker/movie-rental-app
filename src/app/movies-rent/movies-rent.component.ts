import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Movie } from 'src/_shared/models/movies.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MovieService } from 'src/_shared/datagateway/movie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArrayHelper } from 'src/_shared/helpers/array.helper';
import { MovieStock } from './../../_shared/models/movies-stock.model';
import { MovieRented } from './../../_shared/models/movies-rented.model';
import { MovieRentService } from './../../_shared/services/movies-rent.service';
import { DateHelper} from 'src/_shared/helpers/date.helper';
@Component({
  selector: 'mrapp-movies-rent',
  templateUrl: './movies-rent.component.html',
  styleUrls: ['./movies-rent.component.scss']
})
export class MoviesRentComponent implements OnInit {

  dataSource: any;
  selectUserRole: string;
  displayedColumns: string[] = ['registrationId', 'title', 'quantity', 'actions'];

  constructor(
    private movieService: MovieService,
    private snackBar: MatSnackBar,
    private movieRentService: MovieRentService,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  @ViewChild('moviesPaginator', { static: true }) paginator: MatPaginator;
  @ViewChild('MatSort', { static: true }) sort: MatSort;


  ngOnInit(): void {
    this.getMovies();
  }

  private getMovies() {
    this.movieService.getMovies().subscribe(
      response => {
        let _movies = response;
        let _stock = [];

        let g = ArrayHelper.groupBy(_movies, movie => movie.registrationId);

        for (let [key, value] of g.entries()) {
          // console.log(key);
          // let i;
          // for(i = 0; i < value.length; i++){
          //   console.log(value[i]);
          // }
          let _movieStockModel = new MovieStock();
          _movieStockModel.registrationId = key;
          _movieStockModel.title = value[0].title;
          _movieStockModel.quantity = value.filter(movie => movie.rented === false).length;
          _stock.push(_movieStockModel);

        }

        this.dataSource = new MatTableDataSource<MovieStock>(_stock);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.log(err);
      }
    );
  }

  async rent(registrationdId: any) {
    let _moviesRented = await this.movieRentService.getMoviesRented().toPromise();
    let _movies = await this.movieService.getMovies().toPromise();
    _moviesRented = _moviesRented.filter(movieRented => movieRented.registrationId === registrationdId);
    let _availableMovie = _movies.find(movie => movie.registrationId === registrationdId && movie.rented === false);

    let movieRented = new MovieRented();
    movieRented.registrationId = _availableMovie.registrationId;
    movieRented.copyCode = _availableMovie.copyCode;
    movieRented.dateRented = DateHelper.formatDate_mm_dd_yy(new Date());
    movieRented.userId = localStorage.getItem("userId");
    movieRented.title = _availableMovie.title;
    movieRented.dueDate = DateHelper.formatDate_mm_dd_yy(DateHelper.getFutureDate(new Date(), 3));
    movieRented.isReturned = false;
    await this.movieRentService.rentMovie(movieRented).toPromise();

    _availableMovie.rented = true;
    const result = await this.movieService.update(_availableMovie).toPromise();

    this.snackBar.open(`${_availableMovie.title} rented!`, null, { duration: 2000 });
    this.getMovies();
  }

}
