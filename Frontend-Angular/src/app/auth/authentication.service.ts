import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Credentials, CredentialsService } from './credentials.service';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}
export interface RegisterContext {
  fullname: string;
  username: string;
  password: string;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService, private http: HttpClient) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(requestObj: LoginContext): Observable<any> {
    // Replace by proper authentication call
    return this.http.post('/login', requestObj, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        // console.log("yut")
        return res.body;
      })
    );
  }
  register(requestObj: RegisterContext): Observable<any> {
    return this.http.post('/register', requestObj, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials(credentialObj);
    return of(true);
  }
}

function credentialObj(_credentialObj: any) {
  throw new Error('Function not implemented.');
}
