import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsService } from '@app/auth/credentials.service';
import { Observable } from 'rxjs/internal/Observable';

export interface AddContext {
  isbn: number;
  bookname: string;
  author: string;
  category_id: string;
  price: number;
  admin_id: number;
}
@Injectable({
  providedIn: 'root',
})
export class AddbooksService {
  constructor(private http: HttpClient, private credentialService: CredentialsService) {}

  getCategory(): Observable<any> {
    return this.http.get('/category', { headers: { Authorization: `Bearer ${this.credentialService.credentials}` } });
  }

  addbook(requestObj: AddContext): Observable<any> {
    return this.http.post('/book', requestObj, {
      headers: { Authorization: `Bearer ${this.credentialService.credentials}` },
    });
  }
}
