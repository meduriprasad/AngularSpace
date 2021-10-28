import { Post } from './../interface/post';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  
  private imageUrl = 'https://robohash.org';
  private apiUrl= environment.apiUrl

  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(`${this.apiUrl}/posts`)
    .pipe(
      // catchError((error: any) =>{
      //   return of([]);
      // }),
      catchError(this.handleError)
    );
  }
  handleError(handleError: HttpErrorResponse): Observable<never>{
    if(handleError.status===404){
      throw new Error('Error 404 occured');
    }
    return throwError("Unknown Error");
  }

  getPost(): Observable<Post>{
    return this.http.get<Post>(`${this.apiUrl}/posts/1`)
  }

  createPost(post: Post): Observable<Post>{
    
    return this.http.post<Post>(`${this.apiUrl}/posts`, post)
  }

  updatePost(post: Post): Observable<Post>{
    
    return this.http.put<Post>(`${this.apiUrl}/posts/${post.id}`, post)
  }

  patchPost(post: Post): Observable<Post>{
    
    return this.http.patch<Post>(`${this.apiUrl}/posts/${post.id}`, post)
  }

  deletePost(id: number): Observable<boolean>{
    
    return this.http.delete<boolean>(`${this.apiUrl}/posts/${id}`)
  }
}
