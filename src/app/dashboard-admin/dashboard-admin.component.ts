import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LogInService } from 'src/_shared/services/login.service';

@Component({
  selector: 'mrapp-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {

  constructor(
    private router: Router,
    private logInService: LogInService
    ) { }

  ngOnInit() {
  }

  logOut(){
    this.logInService.logOut();
    this.router.navigateByUrl("login");
  }

}
