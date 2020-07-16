import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInService } from 'src/_shared/services/login.service';

@Component({
  selector: 'mrapp-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

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
