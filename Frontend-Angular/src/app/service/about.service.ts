import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsService } from '@app/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(private http: HttpClient, private credentialService: CredentialsService) {}
  getBooks(): Observable<any> {
    return this.http.get('/book', { headers: { Authorisation: `Bearer ${this.credentialService.credentials}` } });
  }
}
