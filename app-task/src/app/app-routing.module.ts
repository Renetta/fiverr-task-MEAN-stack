import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsComponent } from './posts/posts.component';
import { PostsCreateComponent } from './posts-create/posts-create.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
const routes: Routes = [
  { path: '', redirectTo: "application/login", pathMatch: 'full'},
  { path: 'application/login', component: LoginComponent },
  { path: 'application/signup', component: SignUpComponent },
  { path: 'home', component: HomeComponent,
    children: [
      { path: '', redirectTo: "posts", pathMatch: 'full'},
      { path: 'posts', component: PostsComponent },
      { path: 'new-posts', component: PostsCreateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponent = [
  LoginComponent,
  SignUpComponent,
  HomeComponent,
  PostsComponent,
  PostsCreateComponent
];
