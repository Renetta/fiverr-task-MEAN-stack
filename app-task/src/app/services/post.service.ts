import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import  { Post } from '../model/post.model';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  API_POST = "http://localhost:3000/api/posts/";
  constructor(private http: HttpClient) { }

  private posts : Post [] = [];

  private updatedPosts = new Subject<Post[]>();

  getPosts() {
    return this.http.get<{message: String, posts: any}>(this.API_POST)
    .pipe(map((postData) => {
      return postData.posts.map((post: { title: any; content: any; _id: any}) => {
        return {
          title: post.title,
          content: post.content,
          id: post._id,
        }
      })

    }))
    .subscribe((changePost) => {
      this.posts = changePost;
      this.updatedPosts.next([...this.posts]);
    });
  }

  addPosts(titlename: string, desc: string) {
    const post: Post = {
      id: "null",
      title: titlename,
      content: desc
    };

    console.log('post11111---' , post);
    return this.http.post<{message: String}>(this.API_POST, post)
    .pipe(map((resData) => {
      this.posts.push(post);
      this.updatedPosts.next([...this.posts]);
      return resData;
    }))

  }

  deletePost(postId: String) {
    const data = {
      id: postId
    };
    this.http.post(this.API_POST + 'delete/', data)
    .subscribe(() => {
      const postDel = this.posts.filter(post => post.id !== postId);
      this.posts = postDel;
      this.updatedPosts.next([...this.posts]);
      console.log('order delted');
    })
  }

  getPostUpdateListener() {
    return this.updatedPosts.asObservable();
  }
}
