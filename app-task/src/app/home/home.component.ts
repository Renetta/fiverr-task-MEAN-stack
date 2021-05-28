import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {

   }

  ngOnInit(): void {
    if (!localStorage.currentUser) {
      this.router.navigate(['/application/login',{ relativeTo: '/sign-in'}]);
    }
  }

  logout() {
    this.authService.logout();
  }
}
