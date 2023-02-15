import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsService } from '@app/auth/credentials.service';
import { Observable } from 'rxjs/internal/Observable';
export interface EditContext {
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
export class UpdateService {


  constructor(private http: HttpClient, private credentialService: CredentialsService) {}

getCategory(): Observable<any> {
    return this.http.get('/category', { headers: { Authorization: `Bearer ${this.credentialService.credentials}` } });
  }
getBooklist(): Observable<any> {
    return this.http.get(`/book`, { headers: { Authorization: `Bearer ${this.credentialService.credentials}` } });
  }
getOneBook(id:any):Observable<any>{
  return this.http.get(`/book/${id}`,{headers:{"Authorization": `Bearer ${this.credentialService.credentials}`}}) 
  }
updateBook(id:any, reqObj: EditContext):Observable<any>{ 
  return this.http.put(`/book/${id}`,reqObj, {headers:{"Authorization": `Bearer ${this.credentialService.credentials}`}}) 
}


}
