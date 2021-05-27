import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usernameError = "Enter the username in correct form";
  emailError = "Enter the Email in correct format";
  passwordError = "Enter a password that contains lowercase, Uppercase letters and atleast one number";
  hide = true;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm) {
    if(loginForm.invalid) return;

    const data = {
      email: loginForm.value.email,
      password: loginForm.value.password
    }

    this.authService.login(data)
    .subscribe(response => {
      console.log(response);
      if (response) {
        this.router.navigate(['/home/posts',{ relativeTo: '/posts'}]);
      }
    });
  }




}
