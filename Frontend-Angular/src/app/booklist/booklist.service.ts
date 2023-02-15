import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsService } from '@app/auth/credentials.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooklistService {
  getOneBook: any;
  
  constructor(private http: HttpClient, private credentialService: CredentialsService) { }

getBooks(): Observable<any> {
    return this.http.get('/book', { headers: { Authorization: `Bearer ${this.credentialService.credentials}` } });
  }
deletebook(isbn: string): Observable<any> {return this.http.delete(`/book/${isbn}`, {headers: { Authorization: `Bearer ${this.credentialService.credentials}`},});
  }
getCategory(): Observable<any> {
  return this.http.get('/category', { headers: { Authorization: `Bearer ${this.credentialService.credentials}` } });
  }
}
