import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { catchError, retry, tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly moreParams = ['test1', 'test2'];
  private imageUrl = 'https://robohash.org';
  private apiUrl= environment.apiUrl

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/users`)
    .pipe(
      map(users => 
            users.map(user => ({
              ...user,
              //name: user.name.toUpperCase(),
              defaultImageUrl: `https://robohash.org/${user.username}`.toLowerCase(),
              searchKey: [user.name, user.username],
              role: user.id === 10? 'admin': 'user'
            })))
    );
  }

  getUsers2(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`)
    .pipe(
      map(users => 
            users.map(user => ({
              id: user.id,
              username: user.username,
              phone: user.phone,
              email: user.email,
              website: user.website,
              name: user.name.toUpperCase(),
              defaulImageUrl: this.imageUrl,
              searchKey: [user.name, user.username],
              isAdmin: user.id === 100
            })))
    );
  }
  getAllUsers(): Observable<HttpEvent<User[]>>{
    
    return this.http.get<User[]>(`${this.apiUrl}/users`,{observe: 'events'})
  }

  getUser(): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/users/1`)
  .pipe(
    map(user => { 
          return { ...user, isAdmin: false } 
        })
  );
  }

  createUser(user: User): Observable<User>{
    
    return this.http.post<User>(`${this.apiUrl}/users`, user)
  }

  updateUser(user: User): Observable<User>{
    
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user)
  }

  patchUser(user: User): Observable<User>{
    
    return this.http.patch<User>(`${this.apiUrl}/users/${user.id}`, user)
  }

  deleteUser(id: number): Observable<boolean>{
    
    return this.http.delete<boolean>(`${this.apiUrl}/users/${id}`)
  }

  getTextFile(): Observable<string> {
    return this.http.get(`assets/text.txt`, { responseType: 'text'});
  }

  downloadFile(): Observable<HttpResponse<Blob>> {
    return this.http.get(`assets/text.txt`, { responseType: 'blob', observe: 'response'});
  }

  uploadFiles(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`http://localhost:9000/file/upload`, formData,
    { observe: 'events', reportProgress: true });
  }
}
