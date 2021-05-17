import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = environment.apiURL
  // v1 = environment.version
  cors = 'https://cors-anywhere.herokuapp.com/'
  token = localStorage.getItem('token');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.token
  })

  constructor(private http: HttpClient) { }

  signupUsuario(user): Observable<any> {

    let credential = {
      username: user.value.user,
      password: user.value.password,
      email: user.value.email,
    }

    return this.http.post<any>(this.cors + this.url + '/cadastro', credential)

  }

  // getAllUsers() {
  //   return this.http.get(`${this.url}/${this.v1}/users`, {headers: this.headers})
  // }

  // deleteUser(user): Observable<any>
  // {
  //   return this.http.delete<any>(`${this.url}/${this.v1}/users/delete/${user.email}`, {headers: this.headers })

  // }

}
