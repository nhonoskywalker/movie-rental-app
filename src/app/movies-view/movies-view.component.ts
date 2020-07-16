import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MovieService } from './../../_shared/datagateway/movie-service';
import { MatTableDataSource } from '@angular/material/table';
import { Movie } from 'src/_shared/models/movies.model';

@Component({
  selector: 'mrapp-movies-view',
  templateUrl: './movies-view.component.html',
  styleUrls: ['./movies-view.component.scss']
})
export class MoviesViewComponent implements OnInit {

  dataSource: any;
  selectUserRole: string;
  displayedColumns: string[] = ['id', 'title', 'copyCode', 'registrationId'];

  constructor(
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
    this.movieService.getMovies().subscribe(
      response => {
        let _movies = response;
        _movies = _movies.sort(function (a, b) {
          if (a.registrationId.length < b.registrationId.length) { return 1; }
          if (a.registrationId.length > b.registrationId.length) { return -1; }
          return 0;
        });

        this.dataSource = new MatTableDataSource<Movie>(_movies);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.log(err);
      }
    );
  }

}
