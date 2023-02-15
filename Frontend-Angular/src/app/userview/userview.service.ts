import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsService } from '@app/auth/credentials.service';
import { map, Observable } from 'rxjs';

export interface SearchContext {
  search_value: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserviewService {
  constructor(private http: HttpClient, private credentialService: CredentialsService) {}

getBook(): Observable<any> {
  return this.http.get('/book', { headers: { Authorization: `Bearer ${this.credentialService.credentials}` } });
  }
searchBook(reqObj:SearchContext): Observable<any>{
  return this.http.post('/search', reqObj, {headers:{ Authorization:`Bearer${this.credentialService.credentials}`}});
  }
}




