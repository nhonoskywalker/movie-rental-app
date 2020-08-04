import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MovieRented } from './../../_shared/models/movies-rented.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieRentService } from './../../_shared/services/movies-rent.service';
import { DateHelper } from './../../_shared/helpers/date.helper';
import { MovieService } from 'src/_shared/datagateway/movie-service';

@Component({
  selector: 'mrapp-customer-movies',
  templateUrl: './customer-movies.component.html',
  styleUrls: ['./customer-movies.component.scss']
})
export class CustomerMoviesComponent implements OnInit {

  dataSource: any;
  selectUserRole: string;
  displayedColumns: string[] = ['id', 'registrationId', 'title', 'copyCode', 'dateRented', 'dueDate', 'actions'];

  constructor(
    private movieRentService: MovieRentService,
    private movieService: MovieService,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  @ViewChild('moviesPaginator', { static: true }) paginator: MatPaginator;
  @ViewChild('MatSort', { static: true }) sort: MatSort;


  ngOnInit(): void {
    this.getMovies();

  }

  ngAfterViewInit(): void {
  }

  private getMovies() {
    this.movieRentService.getMoviesRented().subscribe(
      response => {
        let _movies = response;
        _movies = _movies.filter(movie => movie.userId === localStorage.getItem("userId") && movie.isReturned === false);
        this.dataSource = new MatTableDataSource<MovieRented>(_movies);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.log(err);
      }
    );
  }

  async returnItem(id: string) {
    let _moviesRented = await this.movieRentService.getMoviesRented().toPromise();
    let _movieRented = _moviesRented.find(movie => movie.id === id);
    _movieRented.dateReturned = DateHelper.formatDate_mm_dd_yy(new Date());
    _movieRented.isReturned = true;

    await this.movieRentService.returnMovie(_movieRented).toPromise()
    let _movies = await this.movieService.getMovies().toPromise();
    
    let _movie = _movies.find(movie => movie.registrationId === _movieRented.registrationId
      && movie.copyCode === _movieRented.copyCode);

    _movie.rented = false;
    await this.movieService.update(_movie).toPromise();
    this.getMovies();
    this.snackBar.open(`Movie returned!`, null, { duration: 2000 });

  }

}
