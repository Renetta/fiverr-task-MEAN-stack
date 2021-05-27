import { Component, OnInit, SecurityContext } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from '../model/post.model';
import { PostService } from '../services/post.service';
import { NgForm } from '@angular/forms';

import { DomSanitizer } from '@angular/platform-browser';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit {
  resultValue!: string | null;
  postName = '';
  postContent = '';
  postNameError = "Please Enter the Post title in the correct form";
  postContentError = "Please enter the description of no more 50 characters";
  post: Post[] = [];
  newPostsCreated = false;

  constructor(private router: Router, private postService: PostService, protected sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.newPostsCreated = false;
  }

  onAddPost(PostForm: NgForm) {
    this.newPostsCreated = false;
    if (PostForm.invalid) return;

    this.postService.addPosts(PostForm.value.postName, PostForm.value.postContent)
    .subscribe((resData) => {
      if (resData) {
        this.resultValue = (this.sanitizer.sanitize(SecurityContext.HTML, PostForm.value.postName));
        this.newPostsCreated = true;
        PostForm.resetForm();
      }
    });
  }

  clearFields() {
    this.postName = '';
    this.postContent = '';
  }

  onCancelPost() {
    this.router.navigate(['/home/posts',{ relativeTo: '/posts'}]);
  }

}
