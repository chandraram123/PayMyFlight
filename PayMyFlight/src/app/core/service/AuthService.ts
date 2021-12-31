import { Constants } from '../constants';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  
  public getToken(): string {
    const token="1BAF7E10-C37D-4753-AE2A-320509DE9C28-1971";
    sessionStorage.setItem('token',token.toString());
    return sessionStorage.getItem('token');
    // return "1BAF7E10-C37D-4753-AE2A-320509DE9C28-1971";
  }
  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    return tokenNotExpired(null, token);
  }
}

function tokenNotExpired(arg0: null, token: string): boolean {
  throw new Error('Function not implemented.');
}
