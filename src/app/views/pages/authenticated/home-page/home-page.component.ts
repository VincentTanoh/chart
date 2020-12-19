import { Component, OnInit } from '@angular/core';
import {User} from '@app/models/user';
import {AuthenticationService} from '@app/services/authentication.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  currentUser: User;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
  }

  logout(): void {
    this.authService.logout();
  }
}
