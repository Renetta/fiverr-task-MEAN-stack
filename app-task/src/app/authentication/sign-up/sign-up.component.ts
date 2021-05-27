import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  firstnameError = "Enter the First name in correct form";
  secondnameError = "Enter the Second name in correct form";
  usernameError = "Enter the username in correct form";
  emailError = "Enter the Email in correct format";
  passwordError = "Enter a password that contains lowercase, Uppercase letters and atleast one number";
  hide = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreateUser(UserForm: NgForm) {
    if (UserForm.invalid) return;
    console.log("clicked");

    const userData: User = {
      id: "null",
      firstname: UserForm.value.firstname,
      secondname: UserForm.value.secondname,
      username: UserForm.value.username,
      email: UserForm.value.email,
      password: UserForm.value.password
    };

    this.authService.createUser(userData)
    .subscribe(response => {
      console.log(response);
      if (response) {
        this.router.navigate(['/application/login',{ relativeTo: '/sign-in'}]);
      }
    });

  }
}
