import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LojaService {

  constructor(private http: HttpClient) { }

  url = environment.apiURL

  token = localStorage.getItem('token');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.token
  })

  buyItem(user, productId) {

    let body = {
      userId: user,
      productId: productId
    }

    return this.http.post<any>(this.url + '/loja/comprar', body)

  }

  listItem() {
    return this.http.get<any>(this.url + '/loja')

  }
}
