import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Post } from '../model/post.model';
import { PostService } from '../services/post.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: Post [] = [];

  constructor(private router: Router, private postService: PostService) { }
  private postSubscription: Subscription = new Subscription;

  ngOnInit(): void {
    console.log("in post method");
    this.postService.getPosts();
    this.postSubscription = this.postService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    })
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

  createPosts() {
    this.router.navigate(['/home/new-posts',{ relativeTo: '/add-new-posts'}]);
  }

  onDelete(postId: String) {
    this.postService.deletePost(postId);
  }

}
