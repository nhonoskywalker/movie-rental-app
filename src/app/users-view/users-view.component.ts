import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from './../../_shared/datagateway/user-service';
import { ThrowStmt } from '@angular/compiler';
import { User } from './../../_shared/models/user.model';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'mrapp-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements OnInit {
  dataSource: any;
  selectUserRole: string;
  displayedColumns: string[] = ['id', 'email', 'username', 'role'];

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  @ViewChild('usersPaginator', { static: true }) paginator: MatPaginator;
  @ViewChild('MatSort', { static: true }) sort: MatSort;


  ngOnInit(): void {
    this.getUsers();

  }

  ngAfterViewInit(): void {
  }

  private getUsers() {
    this.userService.getUsers().subscribe(
      response => {
        let _users = response;
        this.dataSource = new MatTableDataSource<User>(_users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        console.log(err);
      }
    );
  }
}
